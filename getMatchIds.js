
const express = require("express");
const fetch = require("node-fetch");
const path = require("path"); 

const app = express();
app.use(express.json());

app.post("/", async (req, res) => {
  const { puuid } = req.body;

  let flag = false; 
  if (!puuid || puuid === "") {
    return res.status(400).json({ error: "puuid was empty " });
  }
  const riotUrl = `https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=1`;
  const headers = {
    "X-Riot-Token": process.env.RIOT_API_KEY,
    "Content-Type": "application/json" 
  };

  try {
    const response = await fetch(riotUrl, { headers });
    const ids = await response.json();


    console.log("match id stuff:", ids); 

    res.status(200).json(ids);
  } catch (err) {
    console.error("riot broke it again", err);
    res.status(500).json({ error: "riot just said no" });
  }
});

module.exports = app;
