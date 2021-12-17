const mongoose = require('mongoose')

const studentSchema = new mongoose.Schema({
    studentId: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    yearOfAdmission: {
        type: String,
        required: true,
    },
    institude: {
        type: mongoose.Types.ObjectId,
        ref: 'Institude',
    },
    registerUnitOfStudies: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'Subject',
        },
    ],
})

const Student = mongoose.model('Student', studentSchema)

module.exports = Student
