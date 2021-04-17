const Discord = require('discord.js');

module.exports = {
    name: "Embed",
    description: "Embed a text",
    usage: "<Text>",
    aliases: ["embed","embedtext"],
       

run: async (client, message, args, color) => {
  
if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.inlineReply("<:Nope:828474288473636864> You don't have the necessary authority - `MANAGE_MESSAGES`")
if (!message.guild.member(client.user).hasPermission("MANAGE_MESSAGES"))
		return message.inlineReply("<:Nope:828474288473636864> Missing Permission on me - `MANAGE_MESSAGES`")
  

    var text = args.join(" ");
    if (!text) return message.inlineReply("Please input the text to get embed in");

    let postMsg = await message.channel.send('Load the text...');

    let embedsay = new Discord.MessageEmbed()
        .setColor(message.guild.me.displayHexColor)
        .setDescription(`${text}`);
        message.channel.send(embedsay).then(() => { postMsg.delete();});
        message.delete({ timeout: 1000 });
  
  
}
}
