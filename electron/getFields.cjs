const axios = require("axios");
require("dotenv").config({ path: "../.env" });

(async () => {
  console.log("🔐 Email:", process.env.VITE_JIRA_EMAIL);
  console.log("🔐 Token:", process.env.VITE_JIRA_API_TOKEN);

  const auth = Buffer.from(
    `${process.env.VITE_JIRA_EMAIL}:${process.env.VITE_JIRA_API_TOKEN}`
  ).toString("base64");

  const res = await axios.get("https://characterstrong.atlassian.net/rest/api/3/field", {
    headers: {
      Authorization: `Basic ${auth}`,
      Accept: "application/json",
    },
  });

  const customFields = res.data.filter(
    (field) => field.custom && field.name.toLowerCase().includes("squad")
  );
  console.log(JSON.stringify(customFields, null, 2));
})();
