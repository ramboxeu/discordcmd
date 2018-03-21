const Discord = require(`discord.js`)

const client = new Discord.Client();

const hellos = [`Yo`, `Hello`, `Hi`, `Whats up`, `Greetings`];

const man = {
    ping: `Pong! Usage: \`>ping\` [Note]: It will be able to return ping`,
    hello: `Say hello to bot! Usage \`>hello\``,
    help: `Get help with commands. Usage \`>help [command]\`, command is optional`,
    config: `Configurate `
}

const commands = require(`./commands.js`);

client.on(`ready`, () => {
    console.log(`Welcome Discord users!`);

    client.user.setActivity(`Version: 0.2`);
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
// I'm using config vars in Heroku to keep my token secret
client.login(process.env.DISCORD_TOKEN || process.argv[2]);
