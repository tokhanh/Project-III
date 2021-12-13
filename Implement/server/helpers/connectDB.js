const mongoose = require('mongoose')
const config = require('../config/config.js')

mongoose.connect(config.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

const conn = mongoose.connection

conn.on('connected', () => console.log(`Database connected!`))
conn.on('disconnected', () => console.log(`Database disconnected`))
conn.on('error', (err) => console.log(`Database connection error ${err}`))

process.on('SIGINT', () => {
    conn.close(function () {
        process.exit(0)
    })
})

module.exports = conn
