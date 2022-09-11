const Discord = require("discord.js")

module.exports = {
  name: "bans",
  aliases: ["listban", "list-ban", "banimentos"],
  
  run: async (client, message, args) => {
    if (!message.member.permissions.has("ADMINISTRATOR")) return message.reply(`Você não possui permissão de \`Administrador\` bobão!`)
   const kenned1 = message.guild.bans.fetch()
   const k = (await kenned1).map((z) => z.user.tag).join("\n") || "\`\`\`Ninguém foi banido\`\`\`"
    const kenned = new Discord.MessageEmbed()
    .setTitle('❌ | Lista de banidos')
    .setDescription(k)
    .setColor("#ef3921")
    .setFooter({ text: message.author.username, iconURL: message.author.displayAvatarURL({ dynamic: true, format: "png" }) })
    .setTimestamp(new Date())
    message.channel.send({embeds: [kenned]})
  }
  }