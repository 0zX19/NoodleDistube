module.exports = {
    name: "Loop",
    aliases: ["loop","l",'repeat'],
    description: "Repeat the song",
    cooldown: "5",
    run: async (client, message, args) => {
        try {
            if (!message.member.voice.channel) return message.channel.send("You have to enter the voice channel first.")
            const queue = client.distube.getQueue(message)
            if (!queue) return message.channel.send("There are no songs in the queue.")
            if (!queue && !client.distube.isPlaying(message)) return message.channel.send("Are you listening?!")
            let mode = null
            switch (args[0]) {
                case "off":
                    mode = 0
                    break
                case "turn it off":
                    mode = 0
                    break
                case "only one song":
                    mode = 1
                    break
                case "one":
                    mode = 1
                    break
                case "all":
                    mode = 2
                    break
                case "all":
                    mode = 2
                    break
            }
            mode = client.distube.setRepeatMode(message, mode)
            mode = mode ? mode === 2 ? "I decided to do `repeat all`": "I decided to do only one song": "Go to `Off`"
            message.channel.send(`${mode} I'll do it!`)
        } catch (e) {
            message.channel.send(`An error has occurred, data cant be execute`)
        }
    }
}
