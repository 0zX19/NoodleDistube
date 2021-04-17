const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "Status",
    aliases: ["state","statement","status"],
    description: "Show statement",
    cooldown: "5",
    run: async (client, message) => {

if (!client.distube.isPlaying(message)) return message.inlineReply("Are you listening?!")
const queue = client.distube.getQueue(message)
if (!queue) return message.inlineReply("There are no songs in the queue.")

 const status = (queue) => `Volume: \`${queue.volume}%\` | Filter: \`${queue.filter || "Off"}\` | Loop: \`${queue.repeatMode ? queue.repeatMode === 2 ? "Full iteration" : "Only one song" : "Off"}\` | Auto play : \`${queue.autoplay ? "On" : "Off"}\``

 const helpEmbed = new MessageEmbed()
 .setColor(message.guild.me.displayHexColor)
 .addField("Statement",`${status(queue)}`)
 return message.channel.send(helpEmbed)
     
    }
}
