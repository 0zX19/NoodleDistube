module.exports = {
    name: "Pause",
    aliases: ["pause", "ps"],
    description: "Pause for a moment",
    cooldown: "5",
    run: async (client, message) => {
        if (!message.member.voice.channel) return message.inlineReply("You have to enter the voice channel first.")
        if (!client.distube.isPlaying(message)) {
            client.distube.resume(message)
            return message.inlineReply("I played the song again.")
        }
        try {
           // message.channel.send(`I paused the song, *Please enter it again to play it again, or \`${client.prefix}Please enter \` again.*`)
            client.distube.pause(message)
            message.react("<:Okay:828475033076629534>")
        } catch (e) {
            message.channel.send(`An error has occurred, data cant be execute`)
        }
    }
}
