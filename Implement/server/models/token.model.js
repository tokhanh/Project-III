const mongoose = require('mongoose')

const recoveryToken = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 10,
    },
    value: {
        type: String,
    },
})

const Token = mongoose.model('Token', recoveryToken)

module.exports = Token
