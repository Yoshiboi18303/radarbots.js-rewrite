import Discord from "discord.js";
import Radar from "@yoshiboi18303/radarbots.js";

const client = new Discord.Client({
  intents: new Discord.IntentsBitField(["Guilds"]),
});
const radar = new Radar(client, "your token goes here");

client.on("ready", async () => {
  console.log("The client is ready!");

  // Post stats to the API
  await radar.postStats().catch(console.error);
});

// Login to Discord
client.login("your bot token");
