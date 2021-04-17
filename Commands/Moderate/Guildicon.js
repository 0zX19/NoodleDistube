const { MessageEmbed } = require('discord.js');

module.exports = {
   
        name: "Guildicon",
        aliases: ["gi"],
        category: "moderation",
        description: "Change the guildicon",
        usage: "<url>",
    run: async (bot, message, args) => {

 if (!message.member.hasPermission('MANAGE_GUILD')) return message.inlineReply("<:Nope:828474288473636864> You don't have the necessary authority - `MANAGE_GUILD`");
    if (!message.guild.me.hasPermission('MANAGE_GUILD')) return message.inlineReply("<:Nope:828474288473636864> Missing Permission on me - `MANAGE_GUILD`");

            if (!args[0]) return message.inlineReply("Please input image url to procced")

   let mei = new MessageEmbed()
    .setAuthor('Guild icon updated')
     
     let you = args[0] ? args[0].replace(/<(.+)>/g, "$1") : "";
     if(!you) return message.reply('Please input the image url')
     message.guild.setIcon(`${you}`)
     message.channel.send(mei);
    }
}
