const Discord = require("discord.js");
const { MessageEmbed } = require('discord.js')
module.exports = {

  name: 'snipe',
  aliases: ["snipe"],
  
run: async(client, message, args)=>{
const msg = client.snipes.get(message.channel.id);
if(!msg) return message.channel.send({embed: {description: `There is no deleted message ${message.channel.name} i thought`, color: "fffaff"}})
   
 let embed = new Discord.MessageEmbed()
.setAuthor(msg.author.username, msg.author.displayAvatarURL())
//.setDescription(`[${msg.content}]`)
.addField("Sniped Content",`\`\`\`\n${msg.content}\n\`\`\``)
//.setDescription(msg.content)
.setColor(message.guild.me.displayHexColor)
.setImage(msg.image)
.setTimestamp()
 message.channel.send(embed)
 
  }
}
