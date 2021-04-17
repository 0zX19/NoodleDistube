module.exports = {
    name: "Resume",
    aliases: ["resume"],
    description: "Play what you paused for a while",
    cooldown: "5",
    run: async (client, message) => {
        if (!message.member.voice.channel) return message.channel.send("You have to enter the voice channel first.")
        const queue = client.distube.getQueue(message)
        if (!queue) return message.channel.send("There are no songs in the queue.")
        try {
            //message.channel.send("I played the song again.")
            client.distube.resume(message)
            message.react("<:Okay:828475033076629534>")
        } catch (e) {
            message.channel.send(`An error has occurred, data cant be execute`)
        }
    }
}
