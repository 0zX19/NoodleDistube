const Discord = require("discord.js");
module.exports = {
  
    name: "Createemoji",
    description: "make emoji",
    usage: "<Url> <Name>",
    aliases: ["createemoji","makeemoji","make","ce"],
  
  run: async (client, message, args) => {
	if (!message.guild.member(client.user).hasPermission("MANAGE_EMOJIS")) return message.inlineReply("<:Nope:828474288473636864> Missing Permission on me - `MANAGE_EMOJIS`")
	try {
		
		if (!message.member.hasPermission("MANAGE_EMOJIS"))
			return message.inlineReply("<:Nope:828474288473636864> You don't have the necessary authority - `MANAGE_EMOJIS`")
		let emoji = message.attachments.array()[0] || args[0];

		if (emoji) {
			if (emoji.url) {
				if (args[0]) {
					message.guild.emojis
						.create(emoji.url, args[0])
						.then(emoji =>
							message.inlineReply("I've create the emoji with name : " + emoji.name + " emoji, look on `Emoji` command")
						)
						.catch(err =>
							message.inlineReply("I couldn't create the emoji, data must be under 256kb")
						);
				} else message.reply("You need to put the name for the emoji in!");
			} else {
				if (args[1]) {
					message.guild.emojis
						.create(emoji, args[1])
						.then(emoji =>
							message.inlineReply("I've create the emoji with name : " + emoji.name + " emoji, look on `Emoji` command")
						)
						.catch(err =>
							message.reply("I couldn't create the emoji!\n" + err)
						);
				} else message.inlineReply("Please input the name for the emoji in!");
			}
		} else message.inlineReply("Please input the image for the emoji!");
	} catch (err) {
		message.inlineReply("There was an error!, data must be under 256kb").catch();
	}
}
}
