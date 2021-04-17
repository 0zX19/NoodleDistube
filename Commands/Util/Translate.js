const { MessageEmbed } = require('discord.js')
const translate = require("@k3rn31p4nic/google-translate-api")

module.exports = {
 name: 'Translate',
 description: 'Translate any languages',
 aliases: ["translate",'tr'],
 usage: '<Text>',
 run: async(client, message, args) => {
const prefix = require("../../config.json").PREFIX;
 if (message.author.bot) return;
 if(!message.content.startsWith(prefix)) return;
 let language = args[0];
 let text = args.slice(1).join(' ')
 
 if(!language) {
 return message.reply('Input a language to translate')
 }
 if(language.length !== 2) {
 return message.channel.send('Language must be 2 letter alias. E.G: `English > en`')
 }
 if(!text) {
 return message.channel.send('What am i supposed to translate ?')
 }
 
 const result = await translate(text, { to: language })

 const embed = new MessageEmbed()
 .setAuthor('Translate', message.author.displayAvatarURL({ dynamic: true }))
 .addField("From",`\`\`\`css
${text}\`\`\``)
  .addField("Result",`\`\`\`css
${result.text}\`\`\``)
 .setColor(message.guild.me.displayHexColor)
 .setFooter(`Request by ${message.author.tag}`)
 .setTimestamp()
 
 message.channel.send(embed)
 }
 }
