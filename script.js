
async function getAccount() {
  const gameName = document.getElementById("riot-id").value;
  const tag = document.getElementById("tag").value;
  const res = await fetch(`/api?gameName=${gameName}&tagLine=${tag}`);
  const data = await res.json();
  document.getElementById("summary").innerText = JSON.stringify(data, null, 2);
  if (data.puuid) {
    const matchIdsRes = await fetch("/getMatchIds", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ puuid: data.puuid })
    });
    const ids = await matchIdsRes.json();

    if (ids[0]) {
      await fetch("/toDB", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ matchId: ids[0] })
      });

      const dbRes = await fetch("/fromDB");
      const dbData = await dbRes.json();
      console.log("Stored data:", dbData);
    }
  }
}
