const mongoose = require('mongoose')

const timeStampSchema = new mongoose.Schema({
    semester: {
        type: 'String',
        required: true,
    },
    registerUnitOfStudyTime: {
        startTime: {
            type: Date,
        },
        endTime: {
            type: Date,
        },
    },
    registerPriotyClassTime: {
        startTime: {
            type: Date,
        },
        endTime: {
            type: Date,
        },
    },
    registerAdjustedClassTime: {
        startTime: {
            type: Date,
        },
        endTime: {
            type: Date,
        },
    },
})

const Timestamp = mongoose.model('Timestamp', timeStampSchema)

module.exports = Timestamp
