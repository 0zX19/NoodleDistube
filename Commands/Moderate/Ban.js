const Discord = require("discord.js");
module.exports = {
  
    name: "Ban",
    description: "banning player",
    usage: "",
    aliases: ["ban","b"],
  
  run: async (client, message, args) => {

if (!message.member.hasPermission("BAN_MEMBERS")) {
           message.inlineReply("<:Nope:828474288473636864> You don't have the necessary authority - `BAN_MEMBERS`")
        }
if (!message.guild.me.hasPermission("BAN_MEMBERS")) return message.inlineReply("<:Nope:828474288473636864> Missing Permission on me - `BAN_MEMBERS`");

 let reason = args.slice(1).join(' ');
  let user = message.mentions.users.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args.join(' ').toLocaleLowerCase()) || message.guild.members.cache.find(r => r.displayName.toLowerCase() === args.join(' ').toLocaleLowerCase()) || message.guild.members.cache.find(r => r.user.id.toLowerCase() === args.join(' ').toLocaleLowerCase())

  if (message.mentions.users.size < 1) return message.inlineReply('Please mention/input a username to ban').catch(console.error);
  let botRolePossition = message.guild.member(client.user).roles.highest.position;
  let rolePosition = message.guild.member(user).roles.highest.position;
  let userRolePossition = message.member.roles.highest.position;
  if (userRolePossition <= rolePosition) return message.inlineReply("Cannot curse that member because they have higher role than you.")
  if (botRolePossition <= rolePosition) return message.inlineReply("Cannot curse that member because they have higher role than me.")
  if (message.mentions.users.first().id === message.author.id) return message.channel.send('You cant do selfban!');
  if (user.id === client.user.id) return message.channel.send("You pleblord, how can you use a bot to ban itself?:joy:");
  if (user.bot) return message.inlineReply("I cant ban a bot")
  if (reason.length < 1) reason = 'No reason supplied.';
 
  if (!message.guild.member(user).bannable) {
    message.channel.send(`:redTick: I cannot ban that member. My role might not be high enough or it's an internal error.`);
    return
  }else{
   let embed = new Discord.MessageEmbed()
    .setAuthor(`${user.username}#${user.discriminator} was banned`,`https://cdn.discordapp.com/emojis/828475033076629534.png?v=1`)
    .setColor("GREEN")
    //let obj = JSON.parse(`{"days":7, "reason": ${reason}}`)
    if(user.bot) return;
    message.mentions.users.first().send({embed}).catch(e =>{
      if(e) return
    });
    message.guild.members.ban(user.id, {days:7, reason: reason})
    let logchannel = message.guild.channels.cache.find(x => x.name = '');
    if  (!logchannel){
    message.channel.send({embed})
    }else{
      client.channels.cache.get(logchannel.id).send({embed});
      message.channel.send({embed})
    } 
    if(user.bot) return;
    message.mentions.users.first().send({embed}).catch(e =>{
      if(e) return 
    });
  }
}
}
