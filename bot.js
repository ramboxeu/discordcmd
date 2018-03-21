const Discord = require(`discord.js`)

const client = new Discord.Client();

const hellos = [`Yo`, `Hello`, `Hi`, `Whats up`, `Greetings`];

const commands = {
    ping: function (...data){
        return `:ping_pong: Pong!`;
    },
    hello: function (...data){
        return `${hellos[Math.round((Math.random() * 4) + 1)]} ${data[0].author.username}!`;
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

    message.channel.send(commands[command](message, args));
})

// I'm using config vars in Heroku to teek my token secret
client.login(process.env.DISCORD_TOKEN);