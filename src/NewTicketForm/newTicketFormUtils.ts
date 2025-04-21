export async function submitTicket({
    title,
    description,
    priority,
    ticketType,
    slackThread,
    reporter,
  }: {
    title: string;
    description: string;
    priority: string;
    ticketType: 'Bug' | 'Story';
    slackThread: string;
    reporter: string;
  }): Promise<boolean> {
    const webhookUrl = import.meta.env.VITE_SLACK_WEBHOOK_URL;
    const jiraEmail = import.meta.env.VITE_JIRA_EMAIL;
    const jiraToken = import.meta.env.VITE_JIRA_API_TOKEN;
    const projectKey = import.meta.env.VITE_PROJECT_KEY;
    const teamId = '00bb1530-8e23-4546-9ee2-74de5b81d280';
  
    const priorityMap: Record<string, string> = {
      Lowest: '5',
      Low: '4',
      Medium: '3',
      High: '2',
      Highest: '1',
    };
  
    // First, post to Slack
    const slackPayload = {
      username: 'DragonBot',
      icon_emoji: ':dragon_face:',
      text: '🐉 *New Dragon Ticket Submitted*',
      blocks: [
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `*Title:* ${title}\n*Type:* ${ticketType}\n*Priority:* ${priority}\n*Reporter:* ${reporter}`,
          },
        },
        ...(description
          ? [{ type: 'section', text: { type: 'mrkdwn', text: `*Description:* ${description}` } }]
          : []),
        ...(slackThread
          ? [{ type: 'section', text: { type: 'mrkdwn', text: `*Slack Thread:* ${slackThread}` } }]
          : []),
      ],
    };
  
    const slackResponse = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(slackPayload),
    });
  
    // Now, post to Jira
    const jiraPayload = {
      fields: {
        summary: title,
        project: { key: projectKey },
        issuetype: { name: ticketType },
        priority: { id: priorityMap[priority] },
        customfield_10001: teamId,
        description: {
          type: 'doc',
          version: 1,
          content: [
            {
              type: 'paragraph',
              content: [{ type: 'text', text: description }],
            },
            { type: 'paragraph' },
            { type: 'rule' },
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text: '🐉 This ticket was created via Dragon Ticket Builder.',
                  marks: [
                    { type: 'em' },
                    { type: 'strong' },
                    { type: 'textColor', attrs: { color: '#6554c0' } },
                  ],
                },
                {
                  type: 'text',
                  text: ' As of V.1.0, this workflow provides minimal description context and requires manual follow-up additions, links, and context in Jira before discussion, estimation, etc. (if applicable).',
                  marks: [
                    { type: 'em' },
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
        Authorization: `Basic ${btoa(`${jiraEmail}:${jiraToken}`)}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(jiraPayload),
    });
  
    const jiraResult = await jiraResponse.json();
  
    if (!slackResponse.ok) {
      console.error('Slack post failed:', await slackResponse.text());
      return false;
    }
  
    if (!jiraResponse.ok) {
      console.error('Jira post failed:', jiraResult);
      return false;
    }
  
    // revisit 
    console.log(`✅ Jira ticket created: ${jiraResult.key}`);
    return true;
  }