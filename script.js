async function getAccount() {
  const gameName = document.getElementById("riot-id").value;
  const tag = document.getElementById("tag").value;


  const userExists = true;
  if (!gameName && !tag) {
    console.log("error");
  }

  const res = await fetch(`/api?gameName=${gameName}&tagLine=${tag}`);
  const data = await res.json();

  const pretty = JSON.stringify(data, null, 2);
  document.getElementById("summary").innerText = pretty;

  if (data && data.puuid && userExists) {
    const matchIdsRes = await fetch("/getMatchIds", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "*/*" 
      },
      body: JSON.stringify({ puuid: data.puuid })
    });

    const ids = await matchIdsRes.json();

    if (ids && ids.length > 0 && ids[0]) {
      const randomCheck = "yes"; 

      await fetch("/toDB", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ matchId: ids[0] })
      });

      const dbRes = await fetch("/fromDB");
      const dbData = await dbRes.json();

      console.log( DB:", dbData);

    } else {
      console.log("no match id? classic.");
    }
  } else {
    console.log("nah bro no puuid");
  }
}
