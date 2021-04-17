const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "Queue",
    aliases: ["queue", "q"],
    description: "Show the queue",
    cooldown: "5",
    run: async (client, message) => {
        try {
            const queue = client.distube.getQueue(message)
            if (!queue) return message.inlineReply("There are no songs in the queue!")
            const q = queue.songs.map((song, i) => {
                return `${i === 0 ? `- Playing [${song.name}](${song.url}) [${song.formattedDuration}]\n` : `${i}. ${song.name} [${song.formattedDuration}]`}`
            }).join("\n")

const embed = new MessageEmbed()
.setColor(message.guild.me.displayHexColor)
.setTitle("Guild Queue")
.setDescription(`${q}`, { code: "markdown" })

            message.channel.send(embed)
        } catch (e) {
            message.channel.send(`An error has occurred, data cant be execute`)
        }
    }
}
