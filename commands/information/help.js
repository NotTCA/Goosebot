const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "help",
  description: "Get a list of commands or info about a specific command.",
  run: async (client, message, args) => {
    if (args[0]) {
      const command =
        client.commands.get(args[0]) ||
        client.commands.find(
          (cmd) => cmd.aliases && cmd.aliases.includes(args[0])
        );

      if (!command || command.directory === "owner") {
        return message.channel.send({
          embeds: [
            new EmbedBuilder()
              .setAuthor({
                name: "*honk*",
                iconURL:
                  "https://media.discordapp.net/attachments/978525658449862676/1005311836754825216/goose_emoji.png",
              })
              .setTitle("That command does not exist.")
              .setColor(client.config.color)
              .setFooter({
                text: client.ee.footertext,
                iconURL: client.ee.footericon,
              }),
          ],
        });
      }

      const embed = new EmbedBuilder()
        .setAuthor({
          name: "*honk*",
          iconURL:
            "https://media.discordapp.net/attachments/978525658449862676/1005311836754825216/goose_emoji.png",
        })
        .setColor(client.config.color);

      if (command.name) {
        embed.setTitle(`Information about \`${command.name}\``);
        embed.addFields({
          name: "Command",
          value: "```" + client.config.prefix + command.name + "```",
        });
      }

      if (command.description)
        embed.addFields({
          name: "Description",
          value: "```" + command.description + "```",
        });
      else
        embed.addFields({
          name: "Description",
          value: "```No description available.```",
        });

      if (command.userPerms)
        embed.addFields({
          name: "Permissions",
          value:
            "```" +
            command.userPerms
              .map(
                (value) =>
                  `${
                    value[0].toUpperCase() +
                    value
                      .toLowerCase()
                      .slice(1)
                      .replace(/_/gi, " ")
                      .replace("guild", "server")
                  }`
              )
              .join(", ") +
            "```",
        });

      if (command.aliases)
        embed.addFields({
          name: "Aliases",
          value: "```" + command.aliases.join(", ") + "```",
        });

      if (command.usage) {
        embed.addFieldss({
          name: "Usage",
          value: `\`\`\`${message.prefix}${command.name} ${command.usage}\`\`\``,
        });
        embed.setFooter({
          text: "<> = required, [] = optional",
        });
      }

      message.channel.send({
        embeds: [embed],
      });
    } else {
      const embed = new EmbedBuilder()
        .setAuthor({
          name: "*honk*",
          iconURL:
            "https://media.discordapp.net/attachments/978525658449862676/1005311836754825216/goose_emoji.png",
        })
        .setColor(client.config.color)
        .setDescription(
          `To see more information for a specific command, type: \`${client.config.prefix}help [command]\`.`
        )
        .setThumbnail(client.user.displayAvatarURL());
      const commands = (category) => {
        return client.commands
          .filter((cmd) => cmd.directory === category)
          .map((cmd) => `\`${cmd.name}\``);
      };
      for (let i = 0; i < client.categories.length; i += 1) {
        const current = client.categories[i];
        if (current === "owner") continue;
        const items = commands(current);
        embed.addFields({
          name: `${current.toUpperCase()} [${items.length}]`,
          value: `> ${items.sort((a, b) => a.localeCompare(b)).join(", ")}`,
        });
      }
      message.channel.send({
        embeds: [embed],
      });
    }
  },
};
