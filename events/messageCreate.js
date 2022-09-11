const config = require(`../config.json`)
module.exports = (client, message) => {
    if (message.author.bot) return;
    let prefix = config.prefix

    if (message.content.indexOf(prefix) !== 0) return;
  
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
  

    //const cmd = client.commands.get(command);
    const cmd = client.commands.get(command.toLowerCase()) || client.commands.find(c => c.aliases?.includes(command.toLowerCase()));

  
    if (!cmd) return;
  
    cmd.run(client, message, args);
};




