const mongoose = require('mongoose')

const timeStampSchema = new mongoose.Schema({
    semester: {
        type: 'String',
        required: true,
    },
    registerUnitOfStudyTime: {
        startDate: {
            type: Date,
        },
        endDate: {
            type: Date,
        },
    },
    registerClassTime: {
        startDate: {
            type: Date,
        },
        endDate: {
            type: Date,
        },
    },
})

const Timestamp = mongoose.model('Timestamp', timeStampSchema)

module.export = Timestamp
