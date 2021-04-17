module.exports = {
    name: "Skip",
    aliases: ["s"],
    description: "Hand over the song",
    cooldown: "5",

    run: async (client, message) => {
        try {
            if (!message.member.voice.channel) return message.inlineReply("You have to enter the voice channel first.")
            if (!client.distube.isPlaying(message)) return message.inlineReply("Are you listening?!")
            client.distube.skip(message)
            message.react("<a:ReoneTrue:826475694661042206>")
        } catch (e) {
            message.channel.send(`An error has occurred, data cant be execute`)
        }
    }
}
