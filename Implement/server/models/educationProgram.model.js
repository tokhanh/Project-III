const mongoose = require('mongoose')

const educationProgramSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    maxLimitOfCredit: {
        type: Number,
        required: true
    },
    subjects: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'Subject',
        },
    ],
})

const EducationProgram = mongoose.model(
    'EducationProgram',
    educationProgramSchema
)

module.exports = EducationProgram
