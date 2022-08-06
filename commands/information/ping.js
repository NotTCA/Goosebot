const { Client, Message, EmbedBuilder } = require("discord.js");

module.exports = {
  name: "ping",
  description: "Pings the Discord API and returns the latency.",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    await message.channel
      .send({
        embeds: [
          new EmbedBuilder()
            .setAuthor({
              name: "Calling...",
            })
            .setColor(client.config.color),
        ],
      })
      .then((res) => {
        const ping = res.createdTimestamp - message.createdTimestamp;

        res.edit({
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
        });
      });
  },
};
