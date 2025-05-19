Developer Manual

This is the developer manual for League Tracker, heres everything you need to know to take over the system
To install the project, clone the repository from this github link, https://github.com/bwyatt9?tab=repositories
You then need to run NPM install in your terminal to install dependencies, and create a file in the root of the project and include the 3 API keys that are used, which are the riot API key (you get this from creating a Riot devloepr accont, going to your dash board and generating a key), Supabase key and supabse URL 

To run the project locally, either use Vercel CLI or click on the file from folder, or use live server, although the best way to test the API is through Vercel

There are no tests currently for the project

Known bugs: Riot API will sometimes block you if you spam it or your key expires, Also the Supabase insert doesn’t check for duplicates, so if you keep hitting submit, you’ll keep saving the same match ID.

Roadmap: you could show more than just one match, like a history of the last 5 games. The chart right now is just fake sample data, so replacing it with real data would make it coole
