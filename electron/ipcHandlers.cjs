const { ipcMain } = require("electron");
const { fetch } = require("undici"); // using undici's fetch
require("dotenv").config();

ipcMain.handle("submit-ticket", async (_event, payload) => {
  const webhookUrl = process.env.VITE_SLACK_TEST_CHANNEL_WEBHOOK_URL;
  const jiraToken = process.env.VITE_JIRA_API_TOKEN;
  const jiraEmail = process.env.VITE_JIRA_EMAIL;
  const projectKey = process.env.VITE_PROJECT_KEY;
  const teamId = "00bb1530-8e23-4546-9ee2-74de5b81d280";

  console.log("✅ ENV loaded:");
  console.log(
    "VITE_SLACK_TEST_CHANNEL_WEBHOOK_URL:",
    process.env.VITE_SLACK_TEST_CHANNEL_WEBHOOK_URL
  );
  console.log("VITE_JIRA_EMAIL:", process.env.VITE_JIRA_EMAIL);
  console.log("VITE_JIRA_API_TOKEN:", process.env.VITE_JIRA_API_TOKEN);
  console.log("VITE_PROJECT_KEY:", process.env.VITE_PROJECT_KEY);

  try {
    // ✅ FORMAT SLACK PAYLOAD LIKE CLI SCRIPT
    const slackPayload = {
      username: "DragonBot",
      icon_emoji: ":dragon_face:",
      text: "🐉 *New Dragon Ticket Submitted*",
      blocks: [
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: `*Title:* ${payload.title}\n*Type:* ${payload.ticketType}\n*Priority:* ${payload.priority}`,
          },
        },
        ...(payload.description
          ? [
              {
                type: "section",
                text: {
                  type: "mrkdwn",
                  text: `*Description:* ${payload.description}`,
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

    // 📨 POST TO SLACK
    if (webhookUrl) {
      console.log("📨 Posting to Slack...");
      console.log("📦 Slack Payload:", JSON.stringify(slackPayload, null, 2));

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

    // 📨 POST TO JIRA
    const jiraPayload = {
      fields: {
        summary: payload.title,
        project: { key: projectKey },
        issuetype: { name: payload.ticketType },
        priority: {
          id: { Lowest: "5", Low: "4", Medium: "3", High: "2", Highest: "1" }[payload.priority],
        },
        customfield_10001: teamId,
        description: {
          type: "doc",
          version: 1,
          content: [
            { type: "paragraph", content: [{ type: "text", text: payload.description }] },
            { type: "paragraph" },
            { type: "rule" },
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "🐉 This ticket was created via Sir Taskalot.",
                  marks: [
                    { type: "em" },
                    { type: "strong" },
                    { type: "textColor", attrs: { color: "#6554c0" } },
                  ],
                },
                {
                  type: "text",
                  text: " This is V.1.0 of a Chromium App experience that is still being improved.",
                  marks: [{ type: "em" }, { type: "textColor", attrs: { color: "#6554c0" } }],
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

    return { success: jiraResponse.ok, key: jiraResult.key || "" };
  } catch (error) {
    console.error("❌ Error submitting ticket:", error);
    return { success: false };
  }
});
