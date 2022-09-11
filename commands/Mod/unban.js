const { MessageEmbed } = require('discord.js');
const rgx = /^(?:<@!?)?(\d+)>?$/;

module.exports = {
  name: 'unban',
  description: 'Unban A User',
  aliases: ['ub', 'unbans'],
  clientPerms: ['BAN_MEMBERS',  'SEND_MESSAGES',  'EMBED_LINKS'],
  userPerms: ['BAN_MEMBERS'],
  run: async (client, message, args) => {
    try {
      const id = args[0];
      message.delete();
      if(!rgx.test(id))

      return message.channel.send(`<:Error:911472103834927145> **INFORME UM ID VALIDO!**`).then(msg => setTimeout(() => msg.delete(), 8000))

      const bannedUsers = await message.guild.bans.fetch();
      const user = bannedUsers.get(id).user;
      if(!user)
      return message.channel.send(`<:Error:911472103834927145> Não foi possível encontrar o usuário, verifique o ID fornecido válido`).then(msg => setTimeout(() => msg.delete(), 8000))
      let reason = args.slice(1).join(' ');
      if(!reason) reason = '`None`';
      if(!reason.lenght > 1024) reason = reason.slice(0, 1021) + '...';

      await message.guild.members.unban(user, reason)
          const embed = new MessageEmbed()
    .setTitle('Membro Desbanido!')
    .setDescription(`<:Check:910671475969777694> ${user.tag} Foi Desbanido`)
    .setFooter(message.member.displayName, message.author.displayAvatarURL({dynamic: true}))
    .setTimestamp()
    .setColor('BLACK');
    message.channel.send({ embeds: [embed] }).then(msg => setTimeout(() => msg.delete(), 8000))
    } catch (err) {
      console.log(err)
    }
  }
}