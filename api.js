const express = require("express");
const fetch = require("node-fetch");

const app = express();
app.use(express.json());

app.get("/", async (req, res) => {
  const { gameName, tagLine } = req.query;

  if (!gameName || !tagLine) {
    return res.status(400).json({ error: "missing input" });
  }

  const url = `https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${gameName}/${tagLine}`;
  const headers = {
    "X-Riot-Token": process.env.RIOT_API_KEY
  };

  try {
    const r = await fetch(url, { headers });
    const data = await r.json();
    res.json(data);
  } catch (err) {
    console.log("couldn't fetch from riot", err);
    res.status(500).json({ error: "server blew up or something" });
  }
});

module.exports = app;
