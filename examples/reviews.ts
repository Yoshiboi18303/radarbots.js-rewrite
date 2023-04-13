import Discord from "discord.js";
import Radar from "@yoshiboi18303/radarbots.js";

const client = new Discord.Client({
  intents: new Discord.IntentsBitField(["Guilds"]),
});
const radar = new Radar(client, "your token goes here");

client.on("ready", async () => {
  console.log("The client is ready!");

  // Get and log all reviews from the API (with variable).
  const reviews = await radar.getReviews().catch(console.error);
  console.log(reviews);

  // With "Client.reviews"
  console.log(radar.reviews);
});

// Login to Discord
client.login("your bot token");
