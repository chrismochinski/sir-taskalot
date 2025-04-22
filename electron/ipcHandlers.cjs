const { ipcMain } = require('electron');
const { fetch } = require('undici'); // replaced fetch with whatever this is
require('dotenv').config();

ipcMain.handle('submit-ticket', async (_event, payload) => {
  const webhookUrl = process.env.VITE_SLACK_WEBHOOK_URL;
  const jiraToken = process.env.VITE_JIRA_API_TOKEN;
  const jiraEmail = process.env.VITE_JIRA_EMAIL;
  const projectKey = process.env.VITE_PROJECT_KEY;
  const teamId = '00bb1530-8e23-4546-9ee2-74de5b81d280';

  try {
    // Post to Slack
    if (webhookUrl) {
      await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
    }

    // Post to Jira
    const jiraPayload = {
      fields: {
        summary: payload.title,
        project: { key: projectKey },
        issuetype: { name: payload.ticketType },
        priority: { id: { Lowest: '5', Low: '4', Medium: '3', High: '2', Highest: '1' }[payload.priority] },
        customfield_10001: teamId,
        description: {
          type: 'doc',
          version: 1,
          content: [
            { type: 'paragraph', content: [{ type: 'text', text: payload.description }] },
            { type: 'paragraph' },
            { type: 'rule' },
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text: '🐉 This ticket was created via Sir Taskalot.',
                  marks: [
                    { type: 'em' },
                    { type: 'strong' },
                    { type: 'textColor', attrs: { color: '#6554c0' } },
                  ],
                },
              ],
            },
          ],
        },
      },
    };

    const jiraResponse = await fetch('https://characterstrong.atlassian.net/rest/api/3/issue', {
      method: 'POST',
      headers: {
        Authorization: `Basic ${Buffer.from(`${jiraEmail}:${jiraToken}`).toString('base64')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(jiraPayload),
    });

    const jiraResult = await jiraResponse.json();

    return { success: jiraResponse.ok, key: jiraResult.key || '' };
  } catch (error) {
    console.error('Error submitting ticket:', error);
    return { success: false };
  }
});
