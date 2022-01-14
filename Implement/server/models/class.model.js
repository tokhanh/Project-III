const mongoose = require('mongoose')

const classModel = new mongoose.Schema({
    code: {
        type: Number,
        required: true,
    },
    semester: {
        type: String,
        required: true
    },
    time: {
        day: {
            type: Number,
            required: true,
        },
        shift: {
            type: Number,
            required: true,
        },
    },
    position: {
        type: String,
        required: true,
    },
    subjectId: {
        type: mongoose.Types.ObjectId,
        ref: 'Subject',
        required: true
    },
    maximum: {
        type: Number,
        required: true,
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
