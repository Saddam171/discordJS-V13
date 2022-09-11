const mongo = require('mongoose')

const guildSet = new mongo.Schema({
    serverId: { type: String},
    canal: { type: String},
})

module.exports = 
mongo.model("SetChannelBv", guildSet)