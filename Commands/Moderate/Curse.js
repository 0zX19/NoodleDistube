const MessageEmbed = require('discord.js');
const Discord = require('discord.js');

 module.exports = {
  
    name: "Curse",
    description: "Remove all from player",
    usage: "",
    aliases: ["curse","remove"],
    run: async (client, message, args) => {

if (!message.member.hasPermission("MANAGE_ROLES")) return message.inlineReply("<:Nope:828474288473636864> You don't have the necessary authority - `MANAGE_ROLES`")
if (!message.guild.member(client.user).hasPermission("MANAGE_ROLES")) return message.inlineReply("<:Nope:828474288473636864> Missing Permission on me - `MANAGE_ROLES`")


let rMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args.join(' ').toLocaleLowerCase()) || message.guild.members.cache.find(r => r.displayName.toLowerCase() === args.join(' ').toLocaleLowerCase()) || message.guild.members.cache.find(r => r.user.id.toLowerCase() === args.join(' ').toLocaleLowerCase())
   
  let botRolePossition = message.guild.member(client.user).roles.highest.position;
  let rolePosition = message.guild.member(rMember).roles.highest.position;
  let userRolePossition = message.member.roles.highest.position;
  if (userRolePossition <= rolePosition) return message.inlineReply("Cannot curse that member because they have higher role than you.")
  if (botRolePossition <= rolePosition) return message.inlineReply("Cannot curse that member because they have higher role than me.")
   const theyi = args[0];
    if (!theyi) return message.inlineReply("Please mention user to curse")
    if (rMember.user.bot) return message.inlineReply("I cant can't curse a bot")

    if (!rMember) return message.inlineReply("That user does not exist.")

    rMember.roles.set([])

    let embedsa = new Discord.MessageEmbed()
    .setAuthor(`${rMember.user.username}#${rMember.user.discriminator} was cursed`,`https://cdn.discordapp.com/emojis/828475033076629534.png?v=1`)
    .setColor("GREEN")
    return message.channel.send(embedsa)

  }
  
 }
 
