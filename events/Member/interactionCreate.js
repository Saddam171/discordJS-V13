const Discord = require('discord.js')

module.exports = {
    name: 'ready',
    once: true,

    /**
     * @param {Client} client 
     */
    async execute(client) {
        
        let users = client.guilds.cache.size.toLocaleString('en-US')
        let servers = client.users.cache.size.toLocaleString('en-US')

        let status = [
          `Status aqui`,
        ],
          i = 0
        setInterval(() => {
          client.user.setActivity(`${status[i++ % status.length]}`, {
            type: `PLAYING`//PLAYING, WATCHING..
          })
        }, 60000);

        console.log(`👤・${client.user.tag} online em ${client.guilds.cache.size.toLocaleString('en-US')} servidores com ${client.users.cache.size.toLocaleString('en-US')} usuários.`);
    }
}