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
      console.error("Read error:", error);
      return res.status(500).json({ error: " error" });
    }
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: "error" });
  }
});

module.exports = app;
