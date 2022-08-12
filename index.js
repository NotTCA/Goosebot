const Discord = require("discord.js");
const Enmap = require("enmap");
const client = new Discord.Client({
  intents: ["Guilds", "GuildMessages", "MessageContent"],
  rest: { offset: 0 },
  allowedMentions: {
    parse: [],
    repliedUser: false,
  },
  presence: {
    activities: [
      {
        name: "with geese",
        type: Discord.ActivityType.Playing,
      },
    ],
  },
});
require("dotenv/config");

module.exports = client;

client.config = require("./config.json");
client.commands = new Discord.Collection();
client.slashCommands = new Discord.Collection();

client.settings = new Enmap({
  name: "settings",
  dataDir: "./databases/settings",
});

client.categories = require("fs").readdirSync("./commands/");

Array("commands", "events", "slashCommands").forEach((handler) => {
  require(`./handlers/${handler}`)(client);
});

client.login(process.env.TOKEN);
