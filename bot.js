const Discord = require(`discord.js`)

const client = new Discord.Client();

const hellos = [`Yo`, `Hello`, `Hi`, `Whats up`, `Greetings`];

const man = {
    ping: `Pong! Usage: \`>ping\` [Note]: It will be able to return ping`,
    hello: `Say hello to bot! Usage \`>hello\``,
    help: `Get help with commands. Usage \`>help [command]\`, command is optional`
}

const commands = {
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
    }
}

client.on(`ready`, () => {
    console.log(`Welcome Discord users!`);

    client.user.setActivity(`Version: 0.1`);
})

client.on(`message`, (message) => {
    if(message.author.bot) return;
    if(message.content.indexOf(`>`) !== 0) return;
    
    const args = message.content.slice(1).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    
    try{
        message.channel.send(`> ${commands[command](message, args)}`);
    } catch(err) {
        message.channel.send(`> Err0r command not found!`);
    }
});
// I'm using config vars in Heroku to teek my token secret
client.login(process.env.DISCORD_TOKEN || process.argv[2]);