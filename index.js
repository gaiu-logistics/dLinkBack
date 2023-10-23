require("dotenv").config();

const express = require("express");
const app = express();

const port = process.env.PORT;

async function makeAuthenticatedRequest(username) {
  const response = await fetch(
    "https://dlink.onweb3.net/api/v1/BasicDLinksProfile",
    {
      method: "GET",
      headers: {
        "X-Api-Key": `769212a23d8108cf837005dd267e487c`,
      },
    }
  );
  const profile = await response.json();
  console.log(port);

  const filteredProfile = profile.list.filter(
    (item) => item.preferredUsername === username
  );
  return filteredProfile;
}
app.get("/", async (req, res) => {
  const username = req.query.username;

  const profile = await makeAuthenticatedRequest(username);
  res.send(profile[0]);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
