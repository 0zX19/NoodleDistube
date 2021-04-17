const { MessageEmbed } = require('discord.js');
// const { owners_id } = require('../../config.json');
// const { devs_id } = require('../../config.json');
// stcon db = require("quick.db");

module.exports = {

    name: "Emoji",
    description: "show all emoji on the server you in",
    usage: "",
    aliases: ["emoji", "emolist"],
run: async (client, message, args, color) => {
	
    let number = message.guild.emojis.cache.array().map((x,i)=> `${x} | ID : \`<:${x.name}:${x.id}>\``)
    number = chunk(number, 10);

    let index = 0;
  
  if(message.guild.emojis.cache.array().length === 0){
return message.inlineReply(`This server dont have any emoji!`);
  }
  
  try {
  let icon = message.guild.iconURL({size: 2048});
  const ge = new MessageEmbed()
  .setColor(message.guild.me.displayHexColor)
  .setTitle(message.guild.name, icon)
  //.setThumbnail(client.user.avatarURL())
  .setDescription(number[index].join('\n'))
  .setFooter(`Page ${index+1}/${number.length} Total Emoji : ${message.guild.emojis.cache.array().length}`)
  
    const m = await message.channel.send(ge);
    await m.react('◀')
    await m.react('🔴')
    await m.react('▶')
    async function awaitReaction(){
    const filter =(rect, usr) => ['◀', '🔴','▶' ].includes(rect.emoji.name) && usr.id === message.author.id
    const response = await m.awaitReactions(filter, {
      max: 1,
      time: 10.64e+7
    });
    if(!response.size){
      return undefined;
    }
    const emoji = response.first().emoji.name;
    if(emoji === '◀') index--
    if(emoji === '🔴')  m.delete()
    if(emoji === '▶') index++
    
    index = ((index % number.length) + number.length) % number.length;
    ge.setDescription(number[index].join('\n'))
    ge.setFooter(`Page ${index+1}/${number.length} • Total Emoji : ${message.guild.emojis.cache.array().length}`)
        await m.edit(ge);
        return awaitReaction();
    }
    return awaitReaction();
  }

  catch(e){
    return message.channel.send(`Oh, an error ocurred :( \`${e.message}\` try again later`)
  }

  
function chunk(array, chunkSize) {
    const temp = [];
    for(let i = 0; i < array.length; i+= chunkSize){
      temp.push(array.slice(i, i+chunkSize));
    }
    return temp;
}
}


}

