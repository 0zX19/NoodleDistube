const { Discord, MessageEmbed } = require('discord.js')
module.exports = {
    name : 'Remind',
    usage: '<Time> <About?>',
    aliases : ['remind',"remindme"],
    description : 'Reminding you',

    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */

    run : async(client, message, args) => {

 var time = args[0];
    var reminder = args.splice(1).join(' ');

    if (!time) return message.channel.send({ embed: {
    title: `Remind`,  
    description: `**Usage:** reminder <time> <about>`
  }});
    if (!reminder) return message.reply('You forgot the reminder / message');

    // Ini tidak akan berfungsi jika bot di-restart atau dihentikan

    time = await time.toString();

    if (time.indexOf('s') !== -1) { // Detik 
        var timesec = await time.replace(/s.*/, '');
        var timems = await timesec * 1000;
    } else if (time.indexOf('m') !== -1) { // Menit
        var timemin = await time.replace(/m.*/, '');
        timems = await timemin * 60 * 1000;
    } else if (time.indexOf('h') !== -1) { // Jam
        var timehour = await time.replace(/h.*/, '');
        timems = await timehour * 60 * 60 * 1000;
    } else if (time.indexOf('d') !== -1) { // Hari
        var timeday = await time.replace(/d.*/, '');
        timems = await timeday * 60 * 60 * 24 * 1000;
    }    else {
        return message.reply('Time must enter \`<number>[s/m/h/d]\`');
    }
  let ioa = new MessageEmbed()
    .setColor(message.guild.me.displayHexColor)
    .setTitle(`Reminding You...`)
    .setDescription(`Reminding on\nTime : ${time}\nAbout : ${reminder}`)   
    message.channel.send(ioa);
 
    setTimeout(function () {
      // message.reply(`Reminding to You`);
       let mes = new MessageEmbed()
       .setColor(message.guild.me.displayHexColor)
       .setTitle(`Time out.`)
       .setDescription(`You got Remind.\nTime : ${time} ago\nAbout : ${reminder}`)   
       message.inlineReply(mes)
       
      
      
      
   // message.member.voice.channel.join();
    }, parseInt(timems));

}


}

    
