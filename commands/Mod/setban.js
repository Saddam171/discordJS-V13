const Discord = require("discord.js");
const db = require("quick.db");

module.exports = {

  name: "setban",

  run: async(client, message, args) => {

    if(!message.member.permissions.has('ADMINISTRATOR')) return message.reply(`${message.author} **Voce não possui permissão para esse comando.**`).then(msg => setTimeout(() => msg.delete(), 9000))
    message.delete()

    if(!args[0]) return message.reply('**Você tem que determinar o canal!**')
    let channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]);
    if(!channel) return message.reply('**Você tem que determinar o canal!**')


    let id = channel.id
    let sucess = new Discord.MessageEmbed()
    .setTitle(`<:right:1009888406093959369> | **Canal de Banimento definido com sucesso!**`)
    .setColor("GREEN")
    .setDescription(`<:staffgold_rz:996487909802786856> | **O novo canal de banimento é** ${channel}`)

    message.reply({embeds: [sucess]})
    .then(msg => setTimeout(() => msg.delete(), 9000))
    db.set(`${message.guild.id}_channelID`,id)
  }
}