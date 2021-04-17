const Discord = require("discord.js");

module.exports = {
 
    name: "Icon",
    aliases: ["icon","guildavatar"],
    usage: "",
    description: "Guild icon information, showing guild icon and the source link.",

run: async (bot, message, args) => {
let msg = await message.channel.send("Generating Avatar Server...");

if(!message.guild.iconURL) return msg.edit("No icon found!");

let iconembed = new Discord.MessageEmbed()

.setFooter("Replying to " + message.author.tag)
.setImage(message.guild.iconURL({ format: 'png', dynamic: true, size: 4096 }))
.setTitle("Server Icon")
.setDescription("[Source]("+message.guild.iconURL()+")")
.setColor(message.guild.me.displayHexColor)
message.channel.send(iconembed)
    
    msg.delete();
 }
}
   
