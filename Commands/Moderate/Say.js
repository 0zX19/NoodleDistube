const Discord = require("discord.js");
module.exports = {

    name: "Say",
    description: "bot can talk",
    usage: "<Text>",
    aliases: ["copy", "say"],

run: async (client,message,args) => {
     if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.inlineReply("<:Nope:828474288473636864> You don't have the necessary authority - `MANAGE_MESSAGES`")
if (!message.guild.member(client.user).hasPermission("MANAGE_MESSAGES")) return message.inlineReply("<:Nope:828474288473636864> Missing Permission on me - `MANAGE_MESSAGES`")
       {
  
        var newmsg = args.join(" ");
        message.delete().catch();
        message.channel.send(args.join(" ")).cleanContent;
    }
    
 }


}
