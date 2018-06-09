// ./modules/utils.js

function send (text){
  return `> ${text}`;
}

function send (text, raw){
  return raw ? text : `> ${text}`;
}

function error (text){
  return `> Error: ${text}`;
}

function info (text){
  return `> Info: ${text}`;
}

function codeblock(code, lang){
  return `\`\`\`${lang}\n${code}\n\`\`\``;
}

module.exports = {send: send, error: error, info: info, codeblock: codeblock}