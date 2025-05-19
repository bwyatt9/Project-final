const express = require("express");
const { createClient } = require("@supabase/supabase-js");

const app = express();

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

app.get("/", async (req, res) => {
  try {
    const { data, error } = await supabase.from("matches").select("*");
    if (error) {
      console.log("couldn't read from db", error);
      return res.status(500).json({ error: "problem" });
    }
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: "something broke" });
  }
});

module.exports = app;
