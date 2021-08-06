const { MessageEmbed } = require("discord.js")
const { getData, getPreview, getTracks } = require("spotify-url-info")

module.exports = {
    name: "Play",
    aliases: ["play","p"],
    description: "Play the song",
    cooldown: "2",
    run: async (client, message, args) => {
        if (!message.member.voice.channel) return message.inlineReply("You have to enter the voice channel first.")
        const permissions = message.channel.permissionsFor(message.client.user)
        if (!message.guild.me.hasPermission("CONNECT")) return message.inlineReply("Missing Permission on me - `CONNECT`")
        if (!message.guild.me.hasPermission("SPEAK")) return message.inlineReply("Missing Permission on me - `SPEAK`")

        const string = args.join(" ")
        const playEmbed = new MessageEmbed()
        if (!string) return message.inlineReply("Input a title to play")
        // spotify
        const spourl = /^(https?:\/\/)+?(www\.)?(open\.spotify\.com)\/(track)\/.+$/gi
        const spoalurl = /^(https?:\/\/)+?(www\.)?(open\.spotify\.com)\/(album)\/.+$/gi
        const spoplurl = /^(https?:\/\/)+?(www\.)?(open\.spotify\.com)\/(playlist)\/.+$/gi
        const sposhowurl = /^(https?:\/\/)+?(www\.)?(open\.spotify\.com)\/(show)\/.+$/gi
        const spoepiurl = /^(https?:\/\/)+?(www\.)?(open\.spotify\.com)\/(episode)\/.+$/gi
        if (spourl.test(string)) {
            try {
                const spodata = await getData(string)
                if (!spodata) return message.channel.send("Spotify link that is not correct.")
                const sposearch = spodata.name
                const spouri = spodata.uri
                message.channel.send(`https://scannables.scdn.co/uri/plain/png/000000/white/640/${spouri}`)
                message.channel.send("<a:loading:775963839862145024> Loading...")
                return client.distube.play(message, sposearch)
            } catch (e) {
                message.channel.send(`An error has occurred, data cant be execute`)
            }
        } else if (spoalurl.test(string)) {
            return message.channel.send("Unfortunately we don't support Spotify albums, we'll be supporting them soon, so stay tuned!")
        } else if (spoplurl.test(string)) {
            try {
                const playlist = await getData(string)
                if (!playlist) return message.channel.send("Spotify link that is not correct.")
                message.channel.send("<a:loading1:826070004952465439> Loading... *It may take a long time.*").then(d => d.delete({timeout : 15000}))
                const items = playlist.tracks.items
                const tracks = []
                let s
                for (let i = 0; i < items.length; i++) {
                    const results = await client.distube.search(`${items[i].track.artists[0].name} - ${items[i].track.name}`)
                      if (results.length < 1) {
                        // eslint-disable-next-line no-unused-vars
                      s++ // could be used later for skipped tracks due to result not being found
                        continue
                    }
                    tracks.push(results[0].url)
                }
                await client.distube.playCustomPlaylist(message, tracks, { name: playlist.name })
            } catch (e) {
                message.channel.send(`An error has occurred, data cant be execute`)
            }
        } else if (sposhowurl.test(string) || spoepiurl.test(string)) {
            return message.channel.send("Unfortunately, Spotify podcasts are not supported.")
        } else if (!spourl.test(string) || !spoalurl.test(string) || !spoplurl.test(string) || !sposhowurl.test(string) || !spoepiurl.test(string)) {
          
            try {
                message.channel.send("<a:loading1:826070004952465439> Loading...").then(d => d.delete({timeout : 2000}))
                client.distube.play(message, string)
            } catch (e) {
                message.channel.send(`An error has occurred, data cant be execute `)
            }
        }
    }

