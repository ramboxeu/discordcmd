// ./bot.js

const Discord = require(`discord.js`);
const commands = require(`./commands.js`);
const customCmd = require(`./customcmd.js`);
const Command = require(`./modules/command.js`);

const client = new Discord.Client();

client.on(`ready`, () => {
    console.log(`Welcome Discord users!`);

    client.user.setActivity(`Version: 0.3 | >help`);
  
//     const timer = setInterval(() => {
//       client.user.setActivity(`Version: 0.3 | >help`);
//     }, 1000);
})

client.on(`message`, (message) => {
    if(message.author.bot) return;
    if(message.guild.channels.find(`name`, `discordcmd-config`)) if(message.channel.id === message.guild.channels.find(`name`, `discordcmd-config`).id) return Command.create(message);
    if(message.content.indexOf(`>`) !== 0) return;  
    
    const args = message.content.slice(1).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    
    Command.exec(command, args, message.guild, res => {
      message.channel.send(res);
    });

//     try{
//         message.channel.send(`> ${commands[command](message, args)}`);
//     } catch(err) {
//         customCmd.getCustomCmds(message.guild).then((res) => {
//             const cmds = JSON.parse(res.last().content.slice(res.last().content.indexOf(`{`), -3));
//             customCmd.execute(cmds.commands[command], message.guild.channels.find(`name`, `discordcmd-config`), message.channel, message.content);
//         });
//     }
});
// I'm using config vars in Heroku and SUPER SECRET test.bat file to keep my token secret
client.login(process.env.DISCORD_TOKEN || process.argv[2]);

module.exports = {client: client};