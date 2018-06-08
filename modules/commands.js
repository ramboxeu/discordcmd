// ./modules/command.js

const Utils = require(`./utils.js`);

function help(args){
  return Utils.send(`BLAH`);
}

module.exports = {
  help: help
};