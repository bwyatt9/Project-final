
const express = require("express");
const fetch = require("node-fetch");
const app = express();
app.use(express.json());
app.post("/", async (req, res) => {
  const { puuid } = req.body;
  if (!puuid) {
    return res.status(400).json({ error: "Missing puuid" });
  }
  const riotUrl = `https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=1`;
  const headers = {
    "X-Riot-Token": process.env.RIOT_API_KEY
  };
  try {
    const response = await fetch(riotUrl, { headers });
    const ids = await response.json();
    res.status(200).json(ids);
  } catch (err) {
    console.error("Error fetching match IDs:", err);
    res.status(500).json({ error: "API fetch failed" });
  }
});
module.exports = app;
