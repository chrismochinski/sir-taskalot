const axios = require("axios");
require("dotenv").config();

function registerGetEpics(ipcMain) {
  ipcMain.handle("get-epics", async () => {
    try {
      // console.log("🔐 Dragon Team ID:", process.env.VITE_JIRA_DRAGON_TEAM_ID);
      // console.log("🔐 Squad Name:", process.env.VITE_JIRA_SQUAD_NAME);
      const response = await axios.get(
        "https://characterstrong.atlassian.net/rest/api/3/search/jql",
        {
          params: {
            jql: `issuetype = Epic AND project = CS AND text ~ "${process.env.VITE_JIRA_SQUAD_NAME}" AND statusCategory != Done ORDER BY created DESC`,
            fields: "summary,key",
            maxResults: 50,
          },
          headers: {
            Authorization: `Basic ${Buffer.from(
              `${process.env.VITE_JIRA_EMAIL}:${process.env.VITE_JIRA_API_TOKEN}`
            ).toString("base64")}`,
            Accept: "application/json",
          },
        }
      );

      return response.data.issues;
    } catch (err) {
      console.error("❌ [getEpics] Error fetching epics:", err);
      return [];
    }
  });
}

module.exports = registerGetEpics;
