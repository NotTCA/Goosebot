const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("Get a list of commands or info about a specific command.")
    .addStringOption((option) =>
      option.setName("command").setDescription("The command to get info about.")
    ),
  run: async (client, interaction) => {
    if (interaction.options.getString("command")) {
      const specified = interaction.options.getString("command");
      const command =
        client.commands.get(specified) ||
        client.commands.find(
          (cmd) => cmd.aliases && cmd.aliases.includes(specified)
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

      interaction.reply({
        embeds: [embed],
        ephemeral: true,
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
          `To see more information for a specific command, type: \`/help [command]\`.`
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
      interaction.reply({
        embeds: [embed],
        ephemeral: true,
      });
    }
  },
};
