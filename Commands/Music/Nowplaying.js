const { MessageEmbed } = require("discord.js")
const createBar = require("string-progressbar")
const { toColonNotation } = require("colon-notation")
module.exports = {
    name: "Nowplaying",
    aliases: ["nowplaying","np"],
    description: "Show the information of the song that is playing",
    cooldown: "5",
    run: async (client, message) => {
        if (!message.member.voice.channel) return message.inlineReply("You have to enter the voice channel first.")
        const queue = client.distube.getQueue(message)
        if (!queue) return message.channel.send("There are no songs in the queue.")
        if (!queue && !client.distube.isPlaying(message)) return message.channel.send("Are you listening?!")
        const song = queue.songs[0]
        const name = song.name
        const user = song.user.tag
        const avatar = song.user.displayAvatarURL({ dynamic: true, format: "png" })
        const link = song.url
        const time = song.duration * 1000
        const currenttime = queue.currentTime
        const tn = song.thumbnail
        const remaining = (time - currenttime) < 0 ? "◉ LIVE" : time - currenttime

        const status = (queue) => `Volume: \`${queue.volume}%\` | Filter: \`${queue.filter || "Off"}\` | Loop: \`${queue.repeatMode ? queue.repeatMode === 2 ? "Full iteration" : "Only one song" : "Off"}\` | Auto play : \`${queue.autoplay ? "On" : "Off"}\``

        try {
            const embed = new MessageEmbed()
                .setColor(message.guild.me.displayHexColor)
                .setAuthor(user, avatar)
                .setTitle("Now Playing")
                .addField("Song",`[${song.name}](${song.url})`)
                //.setURL(`${link}`)
                .addField("Duration",`• Duration Remaining : \`[${queue.formattedCurrentTime}/${song.formattedDuration}]\`\n` +
                `${time === 0 ? "" : `• Time Remaining : \`[${toColonNotation(remaining)}]\``}`)
                 .addField("Statement", `${status(queue)}`)
                 .setFooter("Noodle Support")

//${createBar(time === 0 ? currenttime : time, currenttime, 25)[0]} 
//${client.distube.isPaused(message) === true ? "LOOK" : "AO"} 
            if (!song.thumbnail === null) {
                embed.setThumbnail(`${tn}`)
            }
            message.channel.send(embed)
        } catch (e) {
            message.channel.send(`An error has occurred, data cant be execute`)
        }
    }
}
