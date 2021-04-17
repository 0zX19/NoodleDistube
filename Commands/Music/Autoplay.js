const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "Autoplay",
    aliases: ["autoplay","auto"],
    description: "Playing random media",
    cooldown: "5",
    run: async (client, message) => {
        try {
            if (!message.member.voice.channel) return message.inlineReply("You have to enter the voice channel first.")
            if (!client.distube.isPlaying(message)) return message.inlineReply("Are you listening?!")
            const mode = client.distube.toggleAutoplay(message)

             const embed = new MessageEmbed()
            .setTitle('Auto play')
            .setColor(message.guild.me.displayHexColor)
            .setDescription(`${(mode ? "<:Okay:828475033076629534>" : "<:Nope:828474288473636864>")} \`|\` Autoplay status`)

            message.channel.send(embed)
        } catch (e) {
            message.channel.send(`An error has occurred, data cant be execute`)
        }
    }
}
