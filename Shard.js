const { ShardingManager } = require("discord.js")
const config = require('../../config.json')

const shard = new ShardingManager("./index.js", {
    token: process.env.TIMBAK,
    autoSpawn: true,
    totalShards: "auto"
})

shards.on('shardCreate', shard => {
  console.log(`[${new Date().toString().split(' ', 5).join(' ')}] Launched shard #${shard.id}`)
})

shard.spawn(shards.totalShards, 10000)
