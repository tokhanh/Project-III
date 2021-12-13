const mongoose = require('mongoose')

const subjectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    code: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
    },
    credit: {
        type: Number,
        required: true,
    },
    institude: {
        type: mongoose.Types.ObjectId,
        ref: 'Institude',
    },
})

const Subject = mongoose.model('Subject', subjectSchema)

module.exports = Subject
