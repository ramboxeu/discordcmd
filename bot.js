const Discord = require(`discord.js`)

const client = new Discord.Client();

client.on(`ready`, () => {
    console.log(`Welcome Discord users!`);

    client.user.setActivity(`Version: 1.0.0`);
})

client.on(`message`, (message) => {
    if(message.author.bot) return;
    if(message.content.indexOf(`>`) !== 0) return;
    
    const args = message.content.slice(1).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    switch(command){
        case `ping`:
            message.channel.send(`> :ping_pong: Pong!`);
            break;
        case `hello`:
            const hellos = [`Yo`, `Hello`, `Hi`, `Whats up`, `Greetings`];
            message.channel.send(`${hellos[Math.round((Math.random() * 4) + 1)]} ${message.author.username}!`);
            break;
    }
})

client.login(`Mzc4NTY1MjU5MDc5ODQzODUx.DZAa9A.C6a_yv-jZiFxxURdukgVf4dy-zU`);