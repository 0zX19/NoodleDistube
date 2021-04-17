const Discord = require("discord.js");

module.exports = {
  name: "Avatar",
  aliases : ["avatar","ava"],
  usage: "",
  description: "Shows player avatar with the source link",
  run: async (client, message, args) => {

let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args.join(' ').toLocaleLowerCase()) || message.guild.members.cache.find(r => r.displayName.toLowerCase() === args.join(' ').toLocaleLowerCase()) || message.guild.members.cache.find(r => r.user.id.toLowerCase() === args.join(' ').toLocaleLowerCase()) || message.member;

//let msg = await message.channel.send("Generating Avatar...");

if(!message.guild.iconURL) return msg.edit("No icon found!");

let iconembed = new Discord.MessageEmbed()
.setColor(message.guild.me.displayHexColor)
//.setFooter("Replying to " + message.author.tag, message.author.displayAvatarURL() )
.setImage(user.user.displayAvatarURL({ format: 'png', dynamic: true, size: 4096 }))
.setTitle(`${user.user.username}`)
.setDescription("[Source]("+user.user.displayAvatarURL()+")")

message.inlineReply(iconembed)

  }
}
