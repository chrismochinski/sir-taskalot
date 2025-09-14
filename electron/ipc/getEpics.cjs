const axios = require("axios");
require("dotenv").config();

function registerGetEpics(ipcMain) {
  ipcMain.handle("get-epics", async () => {
    try {
      console.log("🔐 DRAGON FIELD ID:", process.env.VITE_JIRA_DRAGON_FIELD_ID);
      console.log("🔐 DRAGON LABEL:", process.env.VITE_JIRA_DRAGON_LABEL);
      const response = await axios.get("https://characterstrong.atlassian.net/rest/api/3/search", {
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
      });

      return response.data.issues;
    } catch (err) {
      console.error("❌ Error fetching epics:", err);
      return [];
    }
  });
}

module.exports = registerGetEpics;
