const { Client, Message, EmbedBuilder } = require("discord.js");
const request = require("request");

module.exports = {
  name: "goose",
  description: "Sends a nice picture of a goose.",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const options = {
      url: "https://source.unsplash.com/random/?goose",
      method: "GET",
    };

    request(options, function (error, response, responseBody) {
      message.channel.send({
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
