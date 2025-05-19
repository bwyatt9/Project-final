const express = require("express");
const fetch = require("node-fetch");
const app = express();
app.use(express.json());
app.get("/", async (req, res) => {
  const { gameName, tagLine } = req.query;
  if (!gameName || !tagLine) {
    return res.status(400).json({ error: "error" });
  }
  const riotUrl = `https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${gameName}/${tagLine}`;
  const headers = {
    "X-Riot-Token": process.env.RIOT_API_KEY
  };
  try {
    const response = await fetch(riotUrl, { headers });
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error("Error ", err);
    res.status(500).json({ error: " error" });
  }
});

module.exports = app;
