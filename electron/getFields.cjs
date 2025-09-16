const axios = require("axios");
require("dotenv").config({ path: "../.env" });

/**
 * Note that this function is temporary and not used in the app
 * It was used to fetch the custom field IDs for "Squad" fields in Jira
 * Run this file with `node electron/getFields.cjs` to see the output
 * Information required for parent epic feature in advanced settings
 */
(async () => {
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
