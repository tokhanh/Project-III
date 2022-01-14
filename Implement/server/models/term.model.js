const mongoose = require('mongoose')

const termSchema = new mongoose.Schema({
    semester: {
        type: String,
        required: true,
    },
    studentId: {
        type: String,
        required: true,
    },
    subject: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'Subject'
    }
})

const Term = mongoose.model('Term', termSchema)

module.exports = Term
