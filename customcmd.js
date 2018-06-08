// ./customcmd.js

const logger = require(`./logger.js`);

module.exports = {
    createCommand: function (message){
        const opts = JSON.parse(message.content.substr(message.content.indexOf(`{`), message.content.indexOf(`}`) - 4));
        let config;
        const addons = ``;
        if(!opts.name){
            return `Err0r: \`name\` field is missing!`;
        }
        message.guild.channels.find(`name`, `discordcmd-config`).fetchMessages({limit: 100}).then((res) => {
            config = JSON.parse(res.last().content.slice(res.last().content.indexOf(`{`), -3));
            config.commands[opts.name] = message.id;
            res.last().edit(`\`\`\`json\n${JSON.stringify(config)}\`\`\``);
        });
    },
    getCustomCmds: async function(guild){
        return guild.channels.find(`name`, `discordcmd-config`).fetchMessages({limit: 100});
    },
    execute: function(id, config, channel, args){
        config.fetchMessages({around: id, limit: 1}).then(res => {
            try {
                const out = eval(`
                (function(){
                    const args = '${args}'.slice(1).trim().split(/ +/g);
                    args.shift();
                    ${res.first().content.slice(res.first().content.indexOf(`}`) + 1, -3)}
                })();`);
                return channel.send(`> ${out}`);
                // if(out != undefined && out != null)
                //     return channel.send(`> ${out}`);
                // else 
                //     return
            } catch(err){
                return channel.send(`> ${err}`);
            }
        });
    }
}