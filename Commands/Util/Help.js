const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "Help",
    aliases: ["help","h","?"],
    description: "Show commands",
    cooldown: "5",
    run: async (client, message) => {
        
            //const commands = message.client.commands.array()

            const helpEmbed = new MessageEmbed()
                .setTitle("Gebian")
                .setDescription(`Hello everyone\nFeature rich with guild manager command`)
                .setColor(message.guild.me.displayHexColor)
                .addField("Helper","`avatar` `emoji` `help` `icon` `remind` `translate`")
                .addField("Sound Media","`play` `skip` `stop` `volume` `queue` `np` `loop` `seek` `autoplay` `pause` `resume` `state` `leave` `filter`")
                .addField("Moderation","`addemoji` `createemoji` `embed` `guildicon` `purge` `say`")
                .addField("Punishment","`curse` `ban` `kick`")
                .addField('Support',`[\Invite\](https://discord.com/api/oauth2/authorize?client_id=822882000461234206&permissions=8&scope=bot)`)  
                .setFooter(`Noodle Support`)
           return message.inlineReply(helpEmbed)

    }
}
