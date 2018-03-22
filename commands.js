const hellos = [`Yo`, `Hello`, `Hi`, `Whats up`, `Greetings`];

const man = {
    ping: `Pong! Usage: \`>ping\` [Note]: It will be able to return ping`,
    hello: `Say hello to bot! Usage \`>hello\``,
    help: `Get help with commands. Usage \`>help [command]\`, command is optional`,
    config: `Configurate `
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
                    console.log(data[0].guild.channels.find(`name`,`discordcmd-config`));
                        if(data[0].guild.channels.find(`name`,`discordcmd-config`)){
                            return `Conifg is now created.`;
                        }
                        data[0].guild.createChannel(`discordcmd-config`, `text`).then(() => {
                            data[0].guild.channels.find(`name`,`discordcmd-config`).send(`\`\`\`json\n{'status':'Work In Progress'}\`\`\``);
                        });
                        break;
                }

                break;
            default: 
                break;
        }
    }
}