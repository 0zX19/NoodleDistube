const Discord = require("discord.js")
const { MessageEmbed } = require("discord.js")

const client = new Discord.Client({
    messageCacheLifetime: 60,
    fetchAllMembers: false,
    messageCacheMaxSize: 10,
    cacheRoles: true,
    cacheChannels: true
})
const fs = require("fs")
const { PREFIX } = require("./config.json")
const filters = require("./filters.json")
const DisTube = require("distube")
const CatLoggr = require("cat-loggr")

client.logger = new CatLoggr()
client.login(process.env.TIMBAK)
require("./Uptime.js")();
require("./InlineMessage");
client.commands = new Discord.Collection()
client.prefix = PREFIX
client.aliases = new Discord.Collection()
const cooldowns = new Discord.Collection()
const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")

// Client events
client.snipes = new Map()
client.on('messageDelete', function(message, channel){
 client.snipes.set(message.channel.id,{
  content: message.content, 
  author: message.author, 
  image: message.attachments.first() ? message.attachments.first().proxyURL : null
  })
})

client.on('message', async message => {
   let embeda = new MessageEmbed()
    .setColor(message.guild.me.displayHexColor)
    .setAuthor(message.author.username, message.author.displayAvatarURL({format: 'png', dynamic: true})+"?size=2048")
    .setDescription('Prefix : \`${PREFIX}\` ')
    //.addField('Invite Me',`[\Invite\](https://discord.com/api/oauth2/authorize?client_id=780626037519679499&permissions=0&scope=bot)`)
    if (message.content === `<@!${client.user.id}>` || message.content === `<@${client.user.id}>`)
    return message.inlineReply(embeda); 
});

client.on("ready", () => {
    client.logger.info(`${client.user.username} ready!`)
    const server = client.guilds.cache.size
    const cstatuslist = [
        `Noodle Development.`,
        `Culverine Development.`,
        `${server} Guild`,
    ]
    setInterval(() => {
        const index = Math.floor(Math.random() * cstatuslist.length)
        client.user.setActivity(cstatuslist[index], { type: "COMPETING" })
    }, 5000)

   
})

//client.on("debug", (e) => logger.log(e))
client.on("warn", (info) => client.logger.warn(info))
client.on("error", (error) => client.logger.error(error))

// Import Commands
fs.readdir("./Commands/Util/", (_err, files) => {
    const jsFiles = files.filter(f => f.split(".").pop() === "js")
    if (jsFiles.length <= 0) return client.logger.error("I can't find the command!")
    jsFiles.forEach((file) => {
        const cmd = require(`./Commands/Util/${file}`)
        client.logger.init(`Loaded ${file}`)
        client.commands.set(cmd.name, cmd)
        if (cmd.aliases) cmd.aliases.forEach(alias => client.aliases.set(alias, cmd.name))
    })
})

fs.readdir("./Commands/Moderate/", (_err, files) => {
    const jsFiles = files.filter(f => f.split(".").pop() === "js")
    if (jsFiles.length <= 0) return client.logger.error("I can't find the command!")
    jsFiles.forEach((file) => {
        const cmd = require(`./Commands/Moderate/${file}`)
        client.logger.init(`Loaded ${file}`)
        client.commands.set(cmd.name, cmd)
        if (cmd.aliases) cmd.aliases.forEach(alias => client.aliases.set(alias, cmd.name))
    })
})

// Import Music Commands
fs.readdir("./Commands/Music/", (_err, files) => {
    const jsFiles = files.filter(f => f.split(".").pop() === "js")
    if (jsFiles.length <= 0) return client.logger.error("I can't find the command!")
    jsFiles.forEach((file) => {
        const cmd = require(`./Commands/Music/${file}`)
        client.logger.init(`Music Loaded ${file}`)
        client.commands.set(cmd.name, cmd)
        if (cmd.aliases) cmd.aliases.forEach(alias => client.aliases.set(alias, cmd.name))
    })
})

// client on
client.on("message", async message => {
    if (!message.guild || message.author.bot || message.channel.type === "dm") return
    const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(PREFIX)})\\s*`)
    if (!prefixRegex.test(message.content)) return

    const [, matchedPrefix] = message.content.match(prefixRegex)

    const args = message.content.slice(matchedPrefix.length).trim().split(/ +/)
    const commandName = args.shift().toLowerCase()

    const command =
    client.commands.get(commandName) ||
    client.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(commandName))

    if (!command) return

    if (!cooldowns.has(command.name)) {
        cooldowns.set(command.name, new Discord.Collection())
    }

    const now = Date.now()
    const timestamps = cooldowns.get(command.name)
    const cooldownAmount = (command.cooldown || 1) * 1000

    if (timestamps.has(message.author.id)) {
        const expirationTime = timestamps.get(message.author.id) + cooldownAmount

        if (now < expirationTime) {
            const timeLeft = (expirationTime - now) / 1000
            return message.inlineReply(
                `\`${command.name}\` The command is ${timeLeft.toFixed(1)} You can use it again in seconds!`
            )
        }
    }

    timestamps.set(message.author.id, now)
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount)

    try {
        command.run(client, message, args)
    } catch (error) {
        client.logger.error(error)
        message.reply(`An error has occurred.\n${error}`).catch(client.logger.error)
    }
})

// DisTube for music
client.distube = new DisTube(client, {
    highWaterMark: 1 << 25,
    searchSongs: false,
    leaveOnEmpty: true,
    customFilters: filters,
    YoutubeCookie: YTCK
})

const status = (queue) => `Volume: \`${queue.volume}%\` | Filter: \`${queue.filter || "Off"}\` | Loop: \`${queue.repeatMode ? queue.repeatMode === 2 ? "Full iteration" : "Only one song" : "Off"}\` | Auto play : \`${queue.autoplay ? "On" : "Off"}\``

client.distube
    .on("playSong", (message, queue, song) => {
        // embed
        const user = song.user.tag
        const avatar = song.user.displayAvatarURL({ dynamic: true, format: "png" })
        const Embed = new MessageEmbed()
            .setTitle("Playing")
            .setColor(message.guild.me.displayHexColor)
            .addField("Song",`[${song.name}](${song.url}) - ${song.formattedDuration}`)
            .addField("Request", `${song.user}`)
            .addField("Statement", `${status(queue)}`)
            .setTimestamp()
        if (!song.thumbnail === null) {
            Embed.setThumbnail(`${song.thumbnail}`)
        }
        // end embed
        message.channel.send(Embed)
        queue.connection.voice.setSelfDeaf(true)
    })

    .on("addSong", (message, queue, song) => {
        // embed
        const Embed = new MessageEmbed()
            .setAuthor("Track Added")
            .setColor(message.guild.me.displayHexColor)
            .addField("Song",`[${song.name}](${song.url}) - ${song.formattedDuration}`)
            .addField("Request", `${song.user}`)
            .setTimestamp()
        if (!song.thumbnail === null) {
            Embed.setThumbnail(`${song.thumbnail}`)
        }
        // end embed
        message.channel.send(Embed)
    })

    .on("playList", (message, queue, playlist, song) => {
        // embed
        const Embed = new MessageEmbed()
            .setAuthor("Track Added")
            .setColor(message.guild.me.displayHexColor)
            .addField("Playlist", `\`${playlist.name}\``)
            .addField("Song", `\`${song.name}\` - \`${song.formattedDuration}\``)
            .addField("Request", `${song.user}`)
            .addField("Statement", `${status(queue)}`)
            .setTimestamp()
        // end embed
        message.channel.send(Embed)
        queue.connection.voice.setSelfDeaf(true)
    })
    .on("addList", (message, queue, playlist) => {
        // embed
        const Embed = new MessageEmbed()
            .setAuthor("Track Added")
            .setColor(message.guild.me.displayHexColor)
            .addField("Playlist", `\`${playlist.name}\``)
            .addField("Song", `${playlist.songs.length}`)
            .addField("Statement", `${status(queue)}`)
            .setTimestamp()
        // end embed
        message.channel.send(Embed)
    })
    .on("initQueue", queue => {
        queue.autoplay = false
    })
    // DisTubeOptions.searchSongs = true
    .on("searchResult", (message, result) => {
        let i = 0
        const resultname = result.map(song => `**${++i}**. ${song.name} - \`${song.formattedDuration}\``).join("\n")
        // embed
        const Embed = new MessageEmbed()
            .setAuthor("🔎 Search")
            .setColor(message.guild.me.displayHexColor)
            .addField("Result Title",`${resultname}`)
            .setFooter("Type anything to cancel the option")
        // end embed
        message.inlineReply(Embed)
    })
    // DisTubeOptions.searchSongs = true
    .on("empty", message => {})
    .on("finish", message => {
        // embed
        const Embed = new MessageEmbed()
            .setAuthor("Empty Queue")
            .setColor(message.guild.me.displayHexColor)
            .setDescription(`If you don't want to hear any more, enter the \`${PREFIX}Exit\` command.`)
        // end embed
        message.channel.send(Embed)
    })
    .on("error", (message, err) => message.inlineReply(`An error has occurred, data cant be execute`))
    .on("noRelated", message => message.channel.send("404 Video not found"))
