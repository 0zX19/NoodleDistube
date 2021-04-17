module.exports = {
    name: "Ping",
    aliases: ["ping","peng","pong"],
    description: "nothing",
    cooldown: "5",
    run: async (client, message, args) => {
        const ping = Math.round(client.ws.ping)
        if (ping <= 250) message.inlineReply(`${ping}ms, That's a good answer!`)
        if (ping > 250) message.inlineReply(`${ping}ms, You may respond a little late!`)
    }
}
