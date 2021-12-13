const mongoose = require('mongoose')

const inStitudeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    institudeCode: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
    },
    address: {
        type: String,
    },
    educationPrograms: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'EducationProgram',
        },
    ],
})

const Institude = mongoose.model('Institude', inStitudeSchema)

module.exports = Institude
