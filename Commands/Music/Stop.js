module.exports = {
    name: "Stop",
    aliases: ["stop"],
    description: "Stop the song",
    cooldown: "5",
    run: async (client, message, args) => {
        try {
            if (!message.member.voice.channel) return message.channel.send("You have to enter the voice channel first.")
            if (!client.distube.isPlaying(message)) return message.channel.send("Are you listening?!")
            const filter = m => m.author.id === message.author.id
            return message.inlineReply("Do you want to stop the song? **(Yes / No)**").then(() => {
                message.channel.awaitMessages(filter, {
                    max: 1,
                    time: 30000,
                    errors: ["time"]
                })
                    .then(message => {
                        message = message.first()
                        if (message.content.toLowerCase() === "yes") {
                            client.distube.stop(message)
                        } else if (message.content.toLowerCase() === "no") {
                            message.channel.send("I'll keep playing the song.")
                        } else {
                            message.inlineReply("That's not the right answer.")
                        }
                    })
                    .catch(collected => {
                        message.inlineReply("30 seconds have passed..")
                    })
            })
        } catch (e) {
            message.channel.send(`An error has occurred.\n\`${e}\``)
        }
    }
}
