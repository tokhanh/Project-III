const mongoose = require('mongoose')

const studentSchema = new mongoose.Schema({
    studentId: {
        type: String,
        required: true,
        unique: true,
    },
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
    status: {
        type: String,
        required: true,
    },
    yearOfAdmission: {
        type: String,
        required: true,
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
