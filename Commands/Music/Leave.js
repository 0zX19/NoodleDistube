module.exports = {
    name: "Leave",
    aliases: ["leave", "exit"],
    description: "Let bot leave the voice channel",
    cooldown: "5",

    run: async (client, message) => {
        try {
            if (!message.member.voice.channel) return message.inlineReply("You have to enter the voice channel first.")
            if (client.distube.isPlaying(message)) {
                const filter = m => m.author.id === message.author.id
                return message.inlineReply("There is a song (or queue) playing, would you like to stop the song? **(Yes/ No)**").then(() => {
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
                                message.inlineReply("I'll keep playing the song.")
                            } else {
                                message.inlineReply("That's not the right answer.")
                            }
                        })
                        .catch(collected => {
                            message.channel.send("10 seconds have passed.")
                        })
                })
            }
            message.guild.voice.channel.leave()
           message.react("<:Okay:828475033076629534>")
        } catch (e) {
            message.channel.send(`An error has occurred, data cant be execute`)
        }
    }
}
