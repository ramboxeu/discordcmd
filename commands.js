module.exports = {
    ping: function (...data){
        return `:ping_pong: Pong!`;
    },
    hello: function (...data){
        return `${hellos[Math.round((Math.random() * 4) + 1)]} ${data[0].author.username}!`;
    },
    help: function (){
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
    man: this.help,
    config: function (...data){
        return `WIP`;
    }
}