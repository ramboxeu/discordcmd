// ./modules/command.js

const Commands = require(`./commands.js`);
const Config   = require(`./config.js`);

function exec(command, args, guild, callback) {
  if (typeof Commands[command] === Function) {
    return callback(Commands[command](args));
  } else {
    Config.getJSON(guild, (json, err) => {
      if(json.commands[command] === undefined)
        return callback(`> Command not found!`);
      else {
        Config.getChannel(guild).fetchMessage(json.commands[command]).then(message => {
          callback(execCustom(parse(message.content), args));
        })
      }
    });
  }
}

function execCustom(code, args) {
  try {
    'use strict';
    const out = eval(
`
(function(){
  ${code}
})()
`
    );
    if(out.raw){
      return out.raw;
    } else {
      return out;
    }
  } catch (err) {
    return err;
  }
}

function parse(text) {
  return text.slice(text.indexOf(`}`) + 1, -3);
}
  
function create(id) {
  
}

module.exports = {exec: exec, execCustom: execCustom, parse: parse, create: create}