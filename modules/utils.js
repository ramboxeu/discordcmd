// ./modules/utils.js

function send (text){
  console.log(text);
  return `> ${text}`;
}

function send (text, raw){
  console.log(text);
  return raw ? text : `> ${text}`;
}

module.exports = {send: send}