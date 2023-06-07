const redis = require('redis')
const client = redis.createClient()
client.connect()

client.on('connect', () => {
    console.log(`Redis connected`)
})

client.on('error', (err) => {
    console.log(`Error ${err}`)
})

module.exports = client
