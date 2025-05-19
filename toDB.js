const express = require("express");
const { createClient } = require("@supabase/supabase-js");

const app = express();
app.use(express.json());

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

app.post("/", async (req, res) => {
  const { matchId } = req.body;
  if (!matchId) {
    return res.status(400).json({ error: "error" });
  }
  try {
    const { error } = await supabase.from("matches").insert([{ matchId }]);
    if (error) {
      console.error("error:", error);
      return res.status(500).json({ error: "error" });
    }
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "error" });
  }
});
module.exports = app;
