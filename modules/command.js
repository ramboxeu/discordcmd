// ./modules/command.js

const Commands = require(`./commands.js`);
const Config   = require(`./config.js`);
const Utils    = require(`./utils.js`);

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
    if (out.raw) {
      return out.raw;
    } else if(out.normal) {
      return `> ${out.normal}`;
    } else if(out.codeblock) {
      return `\`\`\`${out.codeblock.lang}\n${out.codeblock.code}\n\`\`\``;
    } else {
      return `> Error: Output type not specified!`;
    }
  } catch (err) {
    return err;
  }
}

function parse(text) {
  return text.slice(text.indexOf(`}`) + 1, -3);
}

function name(raw){
  return JSON.parse(raw.substr(raw.indexOf(`{`), raw.indexOf(`}`) - 4)).name;
}

function create(message) {
  Config.getRaw(message.guild, config => {
    const json = Config.makeJSON(config.content);
    json.commands[name(message.content)] = message.id;
    config.edit(Utils.codeblock(JSON.stringify(json), `json`));
  });
}

module.exports = {exec: exec, execCustom: execCustom, parse: parse, create: create}