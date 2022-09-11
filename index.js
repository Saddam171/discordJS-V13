const Discord = require("discord.js"); 
const client = new Discord.Client({intents: 32767, partials: ["MESSAGE", "USER", "REACTION"]});
const config = require("./config.json"); 
const logs = require('discord-logs');
const mongoose = require('mongoose')
const db = require('quick.db');
const ms = require("ms")


logs(client, {
    debug: true
});

client.login(config.token); 

/// PUXANDO A DATABASE
const dbIndex = require("./database/index.js");
dbIndex.start();
/// PUXANDO A DATA BASE

///  LOG QUE APARECE NO TERMINAL
client.once('ready', async () => {

    console.log(`🟢 - ${client.user.tag} Foi iniciado em ${client.guilds.cache.size} servidores!\n💻 - Tenho acesso a ${client.channels.cache.size} canais!\n👤 - Cuidando de ${client.users.cache.size} usuarios!` )

})
/// LOG QUE APARECE NO TERMINAL



/// PUXA A PASTA DE COMANDOS
const fs = require("fs");
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.categories = fs.readdirSync(`./commands/`);

fs.readdirSync('./commands/').forEach(local => {
    const comandos = fs.readdirSync(`./commands/${local}`).filter(arquivo => arquivo.endsWith('.js'))

    for(let file of comandos) {
        let puxar= require(`./commands/${local}/${file}`)

        if(puxar.name) {
            client.commands.set(puxar.name, puxar)
        } 
        if(puxar.aliases && Array.isArray(puxar.aliases))
        puxar.aliases.forEach(x => client.aliases.set(x, puxar.name))
    } 
});
/// PUXA A PASTA DE COMANDOS

/// SET PREFIXO, ISSO MUDA O PREFIXO DO BOT NO SERVIDOR
client.on("messageCreate", async (message) => {

    let prefix = config.prefix;
  
      if (message.author.bot) return;
      if (message.channel.type == 'dm') return;     
  
       if (!message.content.toLowerCase().startsWith(prefix.toLowerCase())) return;
    
      if(message.author.bot) return;
      if(message.channel.type === 'dm') return;
  
      if(!message.content.startsWith(prefix)) return;
      const args = message.content.slice(prefix.length).trim().split(/ +/g);
  
      let cmd = args.shift().toLowerCase()
      if(cmd.length === 0) return;
      let command = client.commands.get(cmd)
      if(!command) command = client.commands.get(client.aliases.get(cmd)) 
    
  try {
      command.run(client, message, args)
  } catch (err) { 
 
     console.error('Erro:' + err); 
  }
});      
/// SET PREFIXO, ISSO MUDA O PREFIXO DO BOT NO SERVIDOR

client.login(process.env.TOKEN)

/// STATUS PERSONALIZADO DO BOT
client.on("ready", () => {
  let activities = [
    `RZ BOTS`,
    ],
    i = 0;
  setInterval( () => client.user.setActivity(`${activities[i++ % activities.length]}`, {
     type: "STREAMING", url: "https://www.twitch.tv/dg_r6"
      }), 5000); 
  client.user
      .setStatus("dnd")
});
/// STATUS PERSONALIZADO DO BOT


 const {
     MessageEmbed, Interaction
} = require('discord.js');


client.on("message", (msg) => {
  let isWelcomeMessage = msg.type === "GUILD_MEMBER_JOIN";

  if (isWelcomeMessage) {
    msg.author.send(`TEXTO DE BEM VINDO/ ESSE TEXTO VAI NA DM, ${msg.author.username}!`);
    }
})