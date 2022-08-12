const {
  SlashCommandBuilder,
  PermissionFlagsBits,
  EmbedBuilder,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("prefix")
    .setDescription("Change the prefix for your server.")
    .addStringOption((option) =>
      option
        .setName("newprefix")
        .setDescription("The new prefix.")
        .setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild),
  run: async (client, interaction) => {
    const prefix = interaction.options.getString("newprefix");
    if (prefix.length > 5)
      return message.channel.send({
        embeds: [
          new EmbedBuilder()
            .setAuthor({
              name: "*honk*",
              iconURL:
                "https://media.discordapp.net/attachments/978525658449862676/1005311836754825216/goose_emoji.png",
            })
            .setDescription("The prefix must be less than 5 characters.")
            .setColor(client.config.color),
        ],
        ephemeral: true,
      });

    client.settings.set(message.guild.id, prefix, "prefix");

    interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setAuthor({
            name: "*honk*",
            iconURL:
              "https://media.discordapp.net/attachments/978525658449862676/1005311836754825216/goose_emoji.png",
          })
          .setDescription(`The new prefix here is \`${prefix}\`.`)
          .setColor(client.config.color),
      ],
      ephemeral: true,
    });
  },
};
