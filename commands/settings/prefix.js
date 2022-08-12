const { Client, Message, EmbedBuilder } = require("discord.js");

module.exports = {
  name: "prefix",
  description: "Change the prefix for your server.",
  aliases: [
    "setprefix",
    "set-prefix",
    "changeprefix",
    "change-prefix",
    "setup-prefix",
    "setupprefix",
  ],
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    if (!args[0])
      return message.channel.send({
        embeds: [
          new EmbedBuilder()
            .setAuthor({
              name: "*honk*",
              iconURL:
                "https://media.discordapp.net/attachments/978525658449862676/1005311836754825216/goose_emoji.png",
            })
            .setDescription("You didn't provide a prefix.")
            .setColor("RED"),
        ],
      });
    if (args[0].length > 5)
      return message.channel.send({
        embeds: [
          new EmbedBuilder()
            .setAuthor({
              name: "*honk*",
              iconURL:
                "https://media.discordapp.net/attachments/978525658449862676/1005311836754825216/goose_emoji.png",
            })
            .setDescription("The prefix must be less than 5 characters.")
            .setColor("RED"),
        ],
      });

    client.settings.set(message.guild.id, args[0], "prefix");

    message.channel.send({
      embeds: [
        new EmbedBuilder()
          .setAuthor({
            name: "*honk*",
            iconURL:
              "https://media.discordapp.net/attachments/978525658449862676/1005311836754825216/goose_emoji.png",
          })
          .setDescription(`The new prefix here is \`${args[0]}\`.`)
          .setColor(client.config.color),
      ],
    });
  },
};
