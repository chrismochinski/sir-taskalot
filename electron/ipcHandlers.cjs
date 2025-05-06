const { ipcMain } = require("electron");
const { fetch } = require("undici");
require("dotenv").config();

ipcMain.handle("submit-ticket", async (_event, payload) => {
  // idea
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
  // slackMarkdown = slackMarkdown.replace(/^\* /gm, "- "); // ver w/ space after
  slackMarkdown = slackMarkdown.replace(/^\*\s+(.*)$/gm, "- $1");
  // Fix ordered lists: 1. → 1.
  // slackMarkdown = slackMarkdown.replace(/^(\d+)\. /gm, "$1. "); // ver w/ space after
  slackMarkdown = slackMarkdown.replace(/^(\d+)\.\s+(.*)$/gm, "$1. $2");
  // Fix markdown links: [text](url) → <url|text>
  slackMarkdown = slackMarkdown.replace(/\[([^\]]+)\]\(([^)]+)\)/g, "<$2|$1>");

  // idea

  const webhookUrl = process.env.VITE_SLACK_TEST_CHANNEL_WEBHOOK_URL;
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
            { type: "paragraph", content: [{ type: "text", text: payload.description }] },
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
                          {
                            type: "strong",
                          },
                          {
                            type: "textColor",
                            attrs: {
                              color: "#0747a6",
                            },
                          },
                        ],
                      },
                    ],
                  },
                ]
              : []),
            { type: "paragraph" },
            { type: "rule" },
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

    // ✅ 2. Use Jira ticket key in the Slack message
    const jiraTicketUrl = `https://characterstrong.atlassian.net/browse/${jiraResult.key}`;
    const priorityEmoji = priorityEmojiMap[payload.priority] || "";

    const slackPayload = {
      blocks: [
        {
          type: "header",
          text: {
            type: "plain_text",
            text: ":dragon-butler: SIR TASKALOT :jira:",
            emoji: true,
          },
        },
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: `🧾 *New Ticket Submitted*${payload.reporter ? ` by *${payload.reporter}*` : ""}`,
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
