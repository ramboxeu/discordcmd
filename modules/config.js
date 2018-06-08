// ./module/config.js

function getChannel(guild){
  return guild.channels.find(`name`, `discordcmd-config`);
}

function getRaw(guild, callback){
  guild.channels.find(`name`, `discordcmd-config`).fetchMessages({limit: 100}).then(messages => {
    return messages.last();
  });
}

function getJSON(guild, callback){
  guild.channels.find(`name`, `discordcmd-config`).fetchMessages({limit: 100}).then(messages => {
    return callback(JSON.parse(messages.last().content.slice(messages.last().content.indexOf(`{`), -3)), null);
  });
}

function findCommand(name, guild){
  getJSON(guild, (json, err) => {
    const id = json.commands[name];
    console.log(id);
    return json.commands[name] + "";
  })
}

function createCommand(name, id, guild){
  return getRaw(guild).edit(`\`\`\`json\n ${JSON.stringify(getJSON(guild)[name] = id)} \n\`\`\``);
}

module.exports = {getJSON: getJSON, getRaw: getRaw, findCommand: findCommand, createCommand: createCommand, getChannel: getChannel}