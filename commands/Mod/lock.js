const Discord = module.require("discord.js");

module.exports = {
  name: "lock",
  description: "locks a Channel",
  category: "admin",
  P_user: ["MANAGE_CHANNELS"],
  P_bot: ["MANAGE_CHANNELS"],
  run: async (client, message, args) => {
    message.channel.permissionOverwrites.edit(message.guild.id, {
      SEND_MESSAGES: false //change here... xd
    });
    const embed = new Discord.MessageEmbed()
      .setTitle("**Canal Trancado** !")
      .setDescription(`🔒 ${message.channel} ,`)
      .setColor("AQUA");
    await message.channel.send({ embeds: [embed] })///.then(msg => setTimeout(() => msg.delete(), 8000))
    message.delete();
  }
};