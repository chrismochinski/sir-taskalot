const fs = require("fs");
const path = require("path");
const FormData = require("form-data");
const { ipcMain } = require("electron");
const { fetch } = require("undici");
require("dotenv").config();
const axios = require("axios");

// TIPTAP TO ADF CONVERSION
function tiptapToADF(tiptapJSON) {
  const convertNode = (node) => {
    switch (node.type) {
      case "paragraph":
        return {
          type: "paragraph",
          content: node.content?.map(convertNode).filter(Boolean),
        };

      case "text":
        return {
          type: "text",
          text: node.text,
          marks: node.marks
            ?.map((mark) => {
              switch (mark.type) {
                case "bold":
                  return { type: "strong" };
                case "italic":
                  return { type: "em" };
                case "underline":
                  return { type: "underline" };
                case "link":
                  return { type: "link", attrs: { href: mark.attrs.href } };
                default:
                  return null;
              }
            })
            .filter(Boolean),
        };

      // These two are key
      case "bold":
      case "italic":
        // wrap in paragraph if somehow hit here
        return {
          type: "paragraph",
          content: [convertNode({ type: "text", text: node.text, marks: [node] })],
        };

      case "bulletList":
        return {
          type: "bulletList",
          content: node.content?.map(convertNode),
        };

      case "orderedList":
        return {
          type: "orderedList",
          content: node.content?.map(convertNode),
        };

      case "listItem":
        return {
          type: "listItem",
          content: node.content?.map(convertNode),
        };

      case "heading":
        return {
          type: "heading",
          attrs: { level: node.attrs.level },
          content: node.content?.map(convertNode),
        };

      default:
        // 🔥 Safe fallback: wrap unknown or text-ish nodes in paragraph
        if (node.text) {
          return {
            type: "paragraph",
            content: [convertNode({ type: "text", text: node.text, marks: node.marks })],
          };
        }
        return null;
    }
  };

  return {
    version: 1,
    type: "doc",
    content: tiptapJSON.content?.flatMap(convertNode).filter(Boolean),
  };
}

// END TIPTAP TO ADF CONVERSION

ipcMain.handle("submit-ticket", async (_event, payload) => {
  // SLACK FORMATTING
  const TurndownService = require("turndown");
  const turndownService = new TurndownService();
  // un-pad extra junk like <p> tags in <li>
  const htmlDescription = payload.description
    .replace(/<li>\s*<p>(.*?)<\/p>\s*<\/li>/g, "<li>$1</li>")
    .replace(/<p>\s*<\/p>/g, ""); // Remove empty <p> tags
  let slackMarkdown = turndownService.turndown(htmlDescription);

  // Fix bold: ** → *
  slackMarkdown = slackMarkdown.replace(/\*\*(.*?)\*\*/g, "*$1*");
  // Fix unordered lists: * → -
  slackMarkdown = slackMarkdown.replace(/^\*\s+(.*)$/gm, "- $1");
  // Fix ordered lists: 1. → 1.
  slackMarkdown = slackMarkdown.replace(/^(\d+)\.\s+(.*)$/gm, "$1. $2");
  // Fix markdown links: [text](url) → <url|text>
  slackMarkdown = slackMarkdown.replace(/\[([^\]]+)\]\(([^)]+)\)/g, "<$2|$1>");

  // const webhookUrl = process.env.VITE_SLACK_TEST_CHANNEL_WEBHOOK_URL;
  // IDEA // REVISIT // IDEA // REVISIT // IDEA // REVISIT
  // idea NOW USING DRAGON CHANNEL AS OF 6/11/25
  const webhookUrl = process.env.VITE_SLACK_DRAGON_CHANNEL_WEBHOOK_URL;
  const jiraToken = process.env.VITE_JIRA_API_TOKEN;
  const jiraEmail = process.env.VITE_JIRA_EMAIL;
  const projectKey = process.env.VITE_PROJECT_KEY;
  const teamId = "00bb1530-8e23-4546-9ee2-74de5b81d280";

  const priorityEmojiMap = {
    Lowest: ":priority-lowest:",
    Low: ":priority-low:",
    Medium: ":priority-medium:",
    High: ":priority-high:",
    Highest: ":priority-highest:",
  };
  try {
    // 📨 1. POST TO JIRA FIRST

    // idea convert JSON for Jira
    const jiraADF = tiptapToADF(payload.descriptionJson);

    // idea DEBUG
    console.log("🧾👀 Jira ADF Content JSON sent:", JSON.stringify(jiraADF, null, 2));

    const jiraPayload = {
      fields: {
        summary: payload.title,
        project: { key: projectKey },
        issuetype: { name: payload.ticketType },
        priority: {
          id: { Lowest: "5", Low: "4", Medium: "3", High: "2", Highest: "1" }[payload.priority],
        },
        customfield_10001: teamId,
        ...(payload.slackThread && { customfield_10084: payload.slackThread }),
        description: {
          type: "doc",
          version: 1,
          content: [
            // MAIN CONTENT FROM jiraADF
            ...jiraADF.content,

            // REPORTER BLOCK (if present)
            ...(payload.reporter
              ? [
                  {
                    type: "heading",
                    attrs: {
                      level: 3,
                    },
                    content: [
                      {
                        type: "text",
                        text: `Reported by: `,
                        marks: [
                          {
                            type: "textColor",
                            attrs: {
                              color: "#0747a6",
                            },
                          },
                        ],
                      },
                      {
                        type: "text",
                        text: `${payload.reporter}`,
                        marks: [
                          { type: "strong" },
                          { type: "textColor", attrs: { color: "#0747a6" } },
                        ],
                      },
                    ],
                  },
                ]
              : []),

            // SLACK THREAD (if present)
            ...(payload.slackThread
              ? [
                  {
                    type: "paragraph",
                    content: [
                      {
                        type: "text",
                        text: "Slack Thread: ",
                      },
                      {
                        type: "text",
                        text: payload.slackThread,
                        marks: [
                          {
                            type: "link",
                            attrs: {
                              href: payload.slackThread,
                            },
                          },
                        ],
                      },
                    ],
                  },
                ]
              : []),

            { type: "rule" },

            // FOOTER CONTENT
            {
              type: "heading",
              attrs: {
                level: 5,
              },
              content: [
                {
                  type: "text",
                  text: "🐉 This ticket was created via ",
                  marks: [{ type: "em" }, { type: "textColor", attrs: { color: "#4c9aff" } }],
                },
                {
                  type: "text",
                  text: "Sir Taskalot™",
                  marks: [
                    { type: "em" },
                    { type: "strong" },
                    { type: "textColor", attrs: { color: "#0747a6" } },
                  ],
                },
                {
                  type: "text",
                  text: ". This lightweight app is intentionally designed to deliver minimal, foundational description content. As a trade-off for simplicity, it may require manual addition of links, screenshots, acceptance criteria, and general context before estimation, progress, or completion. ",
                  marks: [{ type: "em" }, { type: "textColor", attrs: { color: "#4c9aff" } }],
                },
                {
                  type: "text",
                  text: "Hit me in Slack!",
                  marks: [
                    {
                      type: "link",
                      attrs: {
                        href: "https://fullbloom.enterprise.slack.com/team/U02P7EVQU4F",
                      },
                    },
                    { type: "em" },
                    { type: "textColor", attrs: { color: "#4c9aff" } },
                    { type: "underline" },
                  ],
                },
              ],
            },
          ],
        },
      },
    };

    console.log("📨 Posting to Jira...");
    const jiraResponse = await fetch("https://characterstrong.atlassian.net/rest/api/3/issue", {
      method: "POST",
      headers: {
        Authorization: `Basic ${Buffer.from(`${jiraEmail}:${jiraToken}`).toString("base64")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jiraPayload),
    });

    const jiraResult = await jiraResponse.json();
    console.log("✅ Jira response:", jiraResult);

    if (!jiraResult.key) {
      throw new Error("❌ Jira ticket creation failed");
    }

    // idea move to separate file later

    // 🖼️ Upload image previews (if any)
    if (payload.previews?.length > 0) {
      for (let i = 0; i < payload.previews.length; i++) {
        const base64 = payload.previews[i];
        const base64Data = base64.split(",")[1];
        const filePath = path.join(__dirname, `jira_upload_${i}.png`);
        fs.writeFileSync(filePath, Buffer.from(base64Data, "base64"));

        console.log("📂 Uploading file:", filePath, fs.existsSync(filePath));

        const form = new FormData();
        form.append("file", fs.createReadStream(filePath));

        console.log("📤 Posting form to Jira with headers:", form.getHeaders());

        try {
          const response = await axios.post(
            `https://characterstrong.atlassian.net/rest/api/3/issue/${jiraResult.key}/attachments`,
            form,
            {
              headers: {
                ...form.getHeaders(),
                Authorization: `Basic ${Buffer.from(`${jiraEmail}:${jiraToken}`).toString(
                  "base64"
                )}`,
                "X-Atlassian-Token": "no-check",
              },
            }
          );

          console.log("📨 Upload response status:", response.status);
          console.log("📨 Upload response headers:", response.headers);

          console.log(`📎 Uploaded attachment ${i + 1}:`, response.data);
        } catch (err) {
          console.error("❌ Axios upload error:", err.response?.data || err.message);
        }

        fs.unlinkSync(filePath); // Clean up temp file
      }
    }

    // idea move to separate file later

    // ✅ 2. Use Jira ticket key in the Slack message
    const jiraTicketUrl = `https://characterstrong.atlassian.net/browse/${jiraResult.key}`;
    const priorityEmoji = priorityEmojiMap[payload.priority] || "";

    // IDEA // REVISIT
    // removing header block for now - unnecessary "branding"
    // IDEA // REVISIT

    const slackPayload = {
      blocks: [
        // {
        //   type: "header",
        //   text: {
        //     type: "plain_text",
        //     text: ":dragonbot: SIR TASKALOT :jira:",
        //     emoji: true,
        //   },
        // },
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: `:ticket-star: *New Ticket Submitted*${
              payload.reporter ? ` by *${payload.reporter}*` : ""
            }`,
          },
        },
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: `*Ticket ID:* <${jiraTicketUrl}|${jiraResult.key}>`,
          },
        },
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: `*Title:* ${payload.title}\n*Type:* ${payload.ticketType}\n*Priority:* ${payload.priority} ${priorityEmoji}`,
          },
        },
        ...(payload.description
          ? [
              {
                type: "section",
                text: {
                  type: "mrkdwn",
                  text: `*Description:*\n${slackMarkdown}`,
                },
              },
            ]
          : []),
        ...(payload.previews?.length > 0
          ? [
              {
                type: "section",
                text: {
                  type: "mrkdwn",
                  text: `🖼️ *${payload.previews.length} image${
                    payload.previews.length === 1 ? "" : "s"
                  } attached to Jira ticket*`,
                },
              },
            ]
          : []),

        ...(payload.slackThread
          ? [
              {
                type: "section",
                text: {
                  type: "mrkdwn",
                  text: `*Slack Thread:* ${payload.slackThread}`,
                },
              },
            ]
          : []),
      ],
    };

    // ✅ 3. POST TO SLACK (now that we have ticket key)
    if (webhookUrl) {
      console.log("📨 Posting to Slack...");
      const slackRes = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(slackPayload),
      });

      const slackText = await slackRes.text();
      console.log("✅ Slack status:", slackRes.status);
      console.log("📬 Slack response:", slackText);
    } else {
      console.warn("⚠️ No Slack webhook URL found!");
    }

    return { success: true, key: jiraResult.key };
  } catch (error) {
    console.error("❌ Error submitting ticket:", error);
    return { success: false };
  }
});
