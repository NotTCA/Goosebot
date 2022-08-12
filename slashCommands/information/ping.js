const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Pings the Discord API and returns the latency."),
  run: async (client, interaction) => {
    await interaction
      .reply({
        embeds: [
          new EmbedBuilder()
            .setAuthor({
              name: "Calling...",
            })
            .setColor(client.config.color),
        ],
        ephemeral: true,
        fetchReply: true,
      })
      .then((res) => {
        const ping = res.createdTimestamp - interaction.createdTimestamp;

        interaction.editReply({
          embeds: [
            new EmbedBuilder()
              .setAuthor({
                name: "*honk*",
                iconURL:
                  "https://media.discordapp.net/attachments/978525658449862676/1005311836754825216/goose_emoji.png",
              })
              .addFields([
                {
                  name: "Bot Ping",
                  value: `${ping}ms`,
                  inline: true,
                },
                {
                  name: "API Ping",
                  value: `${client.ws.ping}ms`,
                  inline: true,
                },
              ])
              .setColor(client.config.color),
          ],
          ephemeral: true,
        });
      });
  },
};
