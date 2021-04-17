 module.exports = {
  
    name: "Purge",
    description: "purge",
    usage: "<Number>",
    aliases: ["purge"],
  
  run: async (client, message, args) => {
if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.inlineReply("<:Nope:828474288473636864> You don't have the necessary authority - `MANAGE_MESSAGES`")
if (!message.guild.member(client.user).hasPermission("MANAGE_MESSAGES")) return message.inlineReply("<:Nope:828474288473636864> Missing Permission on me - `MANAGE_MESSAGES`")
    if (isNaN(args[0])) return message.inlineReply("Please input a valid number to delete.") // isNaN = is Not a Number. (case sensitive, write it right)
    if (args[1] > 100) return message.inlineReply("Insert the number less than 100.") // Discord limited purge number into 100.
    if (args[0] < 2) return message.inlineReply("Insert the number more than 1.")
    
    await message.delete()
    await message.channel.bulkDelete(args[0])
   
    
    .then(messages => message.channel.send(`Deleting ${messages.size}/${args[0]} messages on this channel`)).then(d => d.delete({timeout: 5000})) // How long this message will be deleted (in ms)
    
    .catch(() => message.channel.send("Something went wrong, while deleting messages.")) // This error will be displayed when the bot doesn't have an access to do it.
  }
}
