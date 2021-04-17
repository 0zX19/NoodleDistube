const { MessageEmbed } = require("discord.js")
const { PREMIUM } = require("../../config.json")
module.exports = {
    name: "Filter",
    description: "Put a filter on the song",
    aliases: ["filter","fil"],
    cooldown: "3",
    run: async (client, message, args) => {
        try {
const embeda = new MessageEmbed()
            .setTitle('Premium')
            .setColor(message.guild.me.displayHexColor)
            .setDescription(`Premium statement!`)


            if(!PREMIUM.includes(message.author.id)) return message.channel.send(embeda);
            if (!message.member.voice.channel) return message.inlineReply("You have to enter the voice channel first.")
            const queue = client.distube.getQueue(message)
            if (!queue) return message.inlineReply("There are no songs in the queue.")
            const songislive = queue.songs[0].isLive
            if (songislive === true) return message.inlineReply("Filters cannot be applied to live broadcasts due to various problems.")

            const embed = new MessageEmbed()
            .setTitle('Filters')
            .setColor(message.guild.me.displayHexColor)
            .setDescription(`Current filter status: \`${queue.filter || "Off"}\``)
            .addField("All Filter","`clear`\n`bassboost`\n`8D`\n`vaporwave`\n`nightcore`\n`phaser`\n`tremolo`\n`vibrato`\n`treble`\n`normalizer`\n`surrounding`\n`pulsator`\n`subboost`\n`karaoke`\n`flanger`\n`gate`\n`haas`\n`mcompand`\n`double`\n`half`")
            .setFooter("Turn off the filter with `Off`")
            
            if ((args[0] === "Off" || args[0] === "off") && queue.filter) client.distube.setFilter(message, queue.filter)
            else if (Object.keys(client.distube.filters).includes(args[0])) client.distube.setFilter(message, args[0])
            else if (!args[0] || !Object.keys(client.distube.filters).includes(args[0])) return message.channel.send(embed)
            message.channel.send(`Current filter status: \`${queue.filter || "Off"}\``)
        } catch (e) {
            message.channel.send(`An error has occurred, data cant be execute`)
        }
    }
}
