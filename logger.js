// ./logger.js

function createLogChannel(guild, text){
    guild.createChannel(`discordcmd-log`).then(() => {
        guild.channels.find(`name`,`discordcmd-log`).send(text);
    });
}

module.exports = {
    log: function(guild, text){
        if(guild.channels.find(`name`,`discordcmd-log`)){
            return guild.channels.find(`name`,`discordcmd-log`).send(text);
        }
        return createLogChannel(guild, text);
    }
}