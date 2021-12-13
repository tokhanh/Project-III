const mongoose = require('mongoose')

const classModel = new mongoose.Schema({
    code: {
        type: Number,
        required: true,
        unique: true
    },
    time: {
        type: Date,
        required: true,
    },
    position: {
        type: String,
        required: true,
    },
    subjectId: {
        type: mongoose.Types.ObjectId,
        ref: 'Subject',
    },
    students: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'Student',
        },
    ],
})

const Class = mongoose.model('Class', classModel)

module.exports = Class
