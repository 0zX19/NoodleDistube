const { toMilliseconds } = require("colon-notation")
module.exports = {
    name: "Seek",
    aliases: ["seek"],
    description: "You can jump to the section you want.",
    cooldown: "5",

    run: async (client, message, args) => {
        try {
            if (!message.member.voice.channel) return message.inlineReply("You have to enter the voice channel first.")
            if (!client.distube.isPlaying(message)) return message.inlineReply("Are you listening?!")
            if (!args[0]) return message.inlineReply("Please tell me how many seconds to jump, for example => `0:40`")
            const queue = client.distube.getQueue(message)
            const song = queue.songs[0]
            const duration = song.duration * 1000
            const fduration = song.formattedDuration
            const islive = song.isLive
            const atm = toMilliseconds(args[0])
            if (islive === true) return message.inlineReply("Live broadcasting is not supported.")
            if (atm > duration) return message.inlineReply(`Please enter the correct number! The current video length is\`${fduration}\` It's.`)
            message.inlineReply(`'${args[0]}' Jump to the section, *If you jump too long, the song may start again.`)
            client.distube.seek(message, Number(atm))
        } catch (e) {
            message.channel.send(`An error has occurred, data cant be execute`)
        }
    }
}
