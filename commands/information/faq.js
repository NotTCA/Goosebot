const { Client, Message, EmbedBuilder } = require("discord.js");

module.exports = {
  name: "faq",
  description: "Answering some frequently asked questions.",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    message.channel.send({
      embeds: [
        new EmbedBuilder()
          .setAuthor({
            name: "*honk*",
            iconURL:
              "https://media.discordapp.net/attachments/978525658449862676/1005311836754825216/goose_emoji.png",
          })
          .setColor(client.config.color)
          .addFields([
            {
              name: "What are you?",
              value: "I'm a Discord bot that sends goose images when asked.",
            },
            {
              name: "How can I get a goose image?",
              value: `It's simple. Just use the \`${message.prefix}goose\` command.`,
            },
            {
              name: "Why?",
              value: "Why not?",
            },
            {
              name: "Who made you?",
              value: "This guy named TCA#7797. He's pretty cool.",
            },
          ]),
      ],
    });
  },
};
