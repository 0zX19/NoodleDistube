const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "Volume",
    aliases: ["volume","vol","v"],
    description: "Manage the volume",
    cooldown: "5",
    run: async (client, message, args) => {
        if (!message.member.voice.channel) return message.inlineReply("You have to enter the voice channel first.")
        const queue = client.distube.getQueue(message)
        if (!queue) return message.inlineReply("There are no songs in the queue.")
        if (!client.distube.isPlaying(message)) return message.inlineReply("Are you listening?!")
        const volume = parseInt(args[0])

const embed = new MessageEmbed()
.setColor(message.guild.me.displayHexColor)
.setAuthor("Volume Manage")
.setDescription(`Default volume : \`50%\`\nMax volume : \`100%\`\nCurrently volume : \`${queue.volume}%\``)

        if (isNaN(volume) || volume > 100) return message.channel.send(embed)
        try {
            client.distube.setVolume(message, volume)

const embed = new MessageEmbed()
.setColor(message.guild.me.displayHexColor)
.setDescription(`I set it to! ${volume}`)

            message.channel.send(embed)
        } catch (e) {
            message.channel.send(`An error has occurred, data cant be execute`)
        }
    }
}
