const Discord = require("discord.js");
module.exports = {
  
    name: "Kick",
    description: "kick player",
    usage: "",
    aliases: ["kick","k"],
  
  run: async (client, message, args) => {

if (!message.member.hasPermission("KICK_MEMBERS")) {
           message.inlineReply("<:Nope:828474288473636864> You don't have the necessary authority - `KICK_MEMBERS`")
        }
if (!message.guild.me.hasPermission("KICK_MEMBERS")) return message.inlineReply("<:Nope:828474288473636864> Missing Permission on me - `KICK_MEMBERS`");

  let reason = args.slice(1).join(' ');
  let user = message.mentions.users.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args.join(' ').toLocaleLowerCase()) || message.guild.members.cache.find(r => r.displayName.toLowerCase() === args.join(' ').toLocaleLowerCase()) || message.guild.members.cache.find(r => r.user.id.toLowerCase() === args.join(' ').toLocaleLowerCase())

  if (message.mentions.users.size < 1) return message.inlineReply('Please mention/input a username to kick').catch(console.error);
  let botRolePossition = message.guild.member(client.user).roles.highest.position;
  let rolePosition = message.guild.member(user).roles.highest.position;
  let userRolePossition = message.member.roles.highest.position;
  if (userRolePossition <= rolePosition) return message.inlineReply("Cannot curse that member because they have higher role than you.")
  if (botRolePossition <= rolePosition) return message.inlineReply("Cannot curse that member because they have higher role than me.")
  if (user.id === message.author.id) return message.reply("You cant do selfkick!");
  if (user.bot) return message.inlineReply("I cant kick a bot")
  if (user.id === client.user.id) return message.inlineReply("You pleblord, how can you use a bot to kick itself?:joy:");
  
  if (reason.length < 1) reason = 'No reason supplied';

  if (!message.guild.member(user).kickable) return message.inlineReply('I cannot kick that member');
  
  let embed = new Discord.MessageEmbed()
    .setAuthor(`${user.username}#${user.discriminator} was kicked`,`https://cdn.discordapp.com/emojis/828475033076629534.png?v=1`)
    .setColor("GREEN")
  
  if(user.bot) return;
   message.mentions.users.first().send({embed}).catch(e =>{
    if(e) return
  });
  message.guild.member(user).kick();

  let logchannel = message.guild.channels.cache.find(x => x.name = '');
  if  (!logchannel){
  message.channel.send({embed})
  }else{
    client.channels.cache.get(logchannel.id).send({embed});
    message.channel.send({embed})
  } 
}
}
