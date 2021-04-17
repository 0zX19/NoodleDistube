const Discord = require('discord.js')
const { parse } = require("twemoji-parser");
const { MessageEmbed } = require("discord.js");

module.exports = {
    name : 'Addemoji',
    usage: '<Emoji>',
    aliases : ['addemoji','add'],
    description : 'Adding emoji to the guild',

    run : async(client, message, args) => {
        if (!message.member.hasPermission("MANAGE_EMOJIS")) {
           message.inlineReply("<:Nope:828474288473636864> You don't have the necessary authority - `MANAGE_EMOJIS`")
        }
        if (!message.guild.me.hasPermission("MANAGE_EMOJIS")) return message.inlineReply("<:Nope:828474288473636864> Missing Permission on me - `MANAGE_EMOJIS`");

        const emoji = args[0];
        if (!emoji) return message.inlineReply("Please input an emoji to add on guild");

        let customemoji = Discord.Util.parseEmoji(emoji);

        if (customemoji.id) {
            const Link = `https://cdn.discordapp.com/emojis/${customemoji.id}.${
              customemoji.animated ? "gif" : "png"
            }`;
            const name = args.slice(1).join(" ");
            message.guild.emojis.create(
                `${Link}`,
                `${name || `${customemoji.name}`}`
            ).catch(error => {
                console.log(error)
            })
          let custom = Discord.Util.parseEmoji(emoji);
            const Added = new MessageEmbed()
                .setTitle(`Successfully`)
                .setColor(message.guild.me.displayHexColor)
                .setDescription(`Ive add the emoji to server\n**Name:** \`${name || `${customemoji.name}`}\`\n**Preview:** [Click](${Link})`)
                .setThumbnail(`https://cdn.discordapp.com/emojis/${custom.id}.${custom.animated ? "gif" : "png"}`)
                .setFooter('Development')
            return message.channel.send(Added).catch(e => {
                console.log(e)
            })
        } else {
            let CheckEmoji = parse(emoji, {
                assetType: "png"
            });
            if (!CheckEmoji[0])
                return message.channel.send(`Please Give Me A Valid Emoji!`);
            message.channel.send(
                `You Can Use Normal Emoji Without Adding In Server!`
            );
        }
    }
};
