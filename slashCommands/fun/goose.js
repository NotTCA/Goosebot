const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const request = require("request");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("goose")
    .setDescription("Sends a nice picture of a goose."),
  run: async (client, interaction) => {
    const options = {
      url: "https://source.unsplash.com/random/?goose",
      method: "GET",
    };

    request(options, function (error, response, responseBody) {
      interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setAuthor({
              name: "*honk*",
              iconURL:
                "https://media.discordapp.net/attachments/978525658449862676/1005311836754825216/goose_emoji.png",
            })
            .setImage(response.request.href)
            .setColor(client.config.color),
        ],
      });
    });
  },
};
