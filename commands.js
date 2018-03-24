// ./commands.js

const hellos = [`Yo`, `Hello`, `Hi`, `Whats up`, `Greetings`];

const man = {
    ping: `Pong! Usage: \`>ping\` [Note]: It will be able to return ping`,
    hello: `Say hello to bot! Usage \`>hello\``,
    help: `Get help with commands. Usage\n * \`> help\` - list of commands\n * \`> help [command]\` - get help with specified command`,
    config: `Configurate DiscordCMD on your server. Usage\n * \`> config file generate\` - create config on your server. **Only server owners can use this command**\n * \`> config file regenerate\` - make config default again **Only server owners can use this command**`
}

module.exports = {
    ping: function (...data){
        return `:ping_pong: Pong!`;
    },
    hello: function (...data){
        return `${hellos[Math.round((Math.random() * 4) + 1)]} ${data[0].author.username}!`;
    },
    help: function (...data){
        if(data[1].length == 1){
            if(man[data[1][0]] == undefined){
                return `Err0r: Help for this command not found!`
            } else {
                return man[data[1][0]];
            }
        } else if (data[1].length == 0){
            return `This will help you:\n\`\`\`md\nCommands:\n> help [command] - get help\n> hello - say hello to bot\n> ping - pong!\`\`\``;
        }
        return `Err0r: Invalid \`help\` command syntax!`;
    },
    config: function (...data){
        switch(data[1][0]){
            case `file`:
                switch(data[1][1]){
                    case `generate`:
                        if(data[0].guild.ownerID == data[0].author.id)
                        {
                            if(data[0].guild.channels.find(`name`,`discordcmd-config`)){
                                return `Conifg is now created.`;
                            }
                            data[0].guild.createChannel(`discordcmd-config`, `text`).then(() => {
                                data[0].guild.channels.find(`name`,`discordcmd-config`).send(`\`\`\`json\n${JSON.stringify({
                                    commands: {}
                                })}\`\`\``);
                            });
                            return `Created config!`;
                        } else
                            return `You must be server owner to use this command`;
                        break;
                    case `regenerate`:
                        if(data[0].guild.ownerID == data[0].author.id){
                            if(!data[0].guild.channels.find(`name`,`discordcmd-config`)){
                                return `Conifg not found use \`\`\`\nconfig file generate\`\`\` to generate config.`;
                            }
                            data[0].guild.channels.find(`name`,`discordcmd-config`).delete().then(() => {
                                data[0].guild.createChannel(`discordcmd-config`, `text`).then(() => {
                                    data[0].guild.channels.find(`name`,`discordcmd-config`).send(`\`\`\`json\n${JSON.stringify({
                                        commands: {}
                                    })}\`\`\``);
                                })
                            });
                            return `Recreated config!`;
                        } else 
                            return `You must be server owner to use this command`;
                        break;
                    default:
                        return `Err0r: Invalid syntax!`;
                }
                break;
            default:
                return `Err0r: Invalid syntax!`;
                break;
        }
    },
    /* Mysterious code
    wiki: function (...data){
        if(data[1].indexOf(`-random`)){
            fetch();
        }
    }
    */
}