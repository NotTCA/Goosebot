const {
  SlashCommandBuilder,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");
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
        components: [
          new ActionRowBuilder().addComponents(
            new ButtonBuilder()
              .setCustomId("nextimg")
              .setLabel("Another one")
              .setStyle(ButtonStyle.Success)
          ),
        ],
      });
    });

    const collector = interaction.channel.createMessageComponentCollector({
      componentType: 2,
      filter: (i) =>
        i.user.id === interaction.member.id && i.customId === "nextimg",
    });

    collector.on("collect", (i) => {
      request(options, function (error, response, responseBody) {
        i.update({
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
          components: [
            new ActionRowBuilder().addComponents(
              new ButtonBuilder()
                .setCustomId("nextimg")
                .setLabel("Another one")
                .setStyle(ButtonStyle.Success)
            ),
          ],
        });
      });
    });
  },
};
