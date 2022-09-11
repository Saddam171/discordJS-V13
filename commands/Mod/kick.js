const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const db = require("quick.db");

module.exports = {

  name: "kick",
  aliases: ['banir'],

  run: async(client, message, args) => {

        if (!message.member.permissions.has("KICK_MEMBERS")) return message.reply(`${message.author} **Voce não possui permissão para esse comando.**`); 

        const usu = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
       
        let reason = args.slice(1).join(" ");
        if (!reason) reason = "Sem Motivo";

        let channelID = db.get(`${message.guild.id}_channelID`)
        if (!channelID) return
        let channel = message.guild.channels.cache.get(channelID)
        if (!channel) return
        
        let clearbutton = new MessageActionRow().addComponents(
            new MessageButton()
            .setCustomId("sim")
            .setLabel("Sim")
            .setStyle("SUCCESS"),
            new MessageButton()
            .setCustomId("nao")
            .setLabel("Não")
            .setStyle("DANGER"),
        )


        let incomplet = new MessageEmbed()
        .setTitle(`🔨 | Comando de KICK`)
        .setColor("WHITE")
        .setDescription(`<a:rz_estrela:979129456683794492> **Comando inválido | Kick**
        <:white_setatduu:975575230632312842> Comando: p!kick
        <:white_setatduu:975575230632312842> Exemplo: p!kick @usuario <motivo>`)
        if (!args[0]) return message.channel.send({embeds: [incomplet]})
        .then(msg => setTimeout(() => msg.delete(), 9000))

        if(!usu) return message.channel.send({embeds: [incomplet]})

        let confirm = new MessageEmbed()
        .setColor("YELLOW")
        .setDescription(`**📝 | Tem certeza que quer Kikar ${usu} ? **`)
        .setTimestamp()

        let enviado = await message.channel.send({ embeds: [confirm], components: [clearbutton]})


        const collector = enviado.createMessageComponentCollector({ componentType: "BUTTON"})

        collector.on("collect", async(interaction) => {
            if(!interaction.memberPermissions.has("ADMINISTRATOR")) return interaction.reply({ content: `${interaction.user}, apenas administradores podem limpar o chat`, ephemeral: true})
            if( interaction.customId === "sim") {

                let sucess = new MessageEmbed()
                .setTitle(`✅ | Usuario Kikado com sucesso!`)
                .setDescription(`**📌 | Voce Kikou o jogador ${usu} por ${reason}!**`)
                .setColor("GREEN")
                .setFooter(`🕐 | Enviado `)
                .setTimestamp()
                message.channel.send({embeds: [sucess]})

                enviado.edit({embeds: [sucess]})

                const embed = new MessageEmbed()
                .setThumbnail(message.guild.iconURL({dynamic : true}))
                .setDescription(`🔨  **Moderador**ㅤㅤㅤㅤㅤㅤㅤㅤㅤ👤  **Usuário**
                 ${message.author.tag}ㅤㅤ${usu.user}
                 \n **ID do usuário**\n${usu.user.id}
                 \n:clipboard: | **Motivo**: ${reason}`)
                .setColor("ORANGE")
                .setTimestamp()
                .setFooter(message.guild.name, message.guild.iconURL({dynamic : true}));  

                const kickmsg = new MessageEmbed()
                .setThumbnail(usu.user.displayAvatarURL())
                .setDescription(`🔨  **Moderador**ㅤㅤㅤㅤㅤㅤㅤㅤㅤ👤  **Usuário**
                ${message.author.tag}ㅤㅤ${usu.user}
                \n **ID do usuário**\n${usu.user.id}
                \n:clipboard: | **Motivo**: ${reason}`)
                .setColor("ORANGE")
                .setTimestamp()
                .setFooter(message.author.tag, message.author.displayAvatarURL());

                await usu.send({embeds: [embed]});
                await usu.kick({
                    reason: reason
                });
                
                channel.send({embeds: [kickmsg]});
            }
            if( interaction.customId === "nao") {
                enviado.edit({
                    content: "**Você cancelou a ação de Banimento.**",
                    embeds: [],
                    components: []
                })
            }
        })
    }
}