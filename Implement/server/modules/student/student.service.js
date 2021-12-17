const Student = require('../../models/student.model')
const User = require('../../models/user.model')

const mongoose = require('mongoose')
const getStudentProfile = async (params = {}) => {
    const { id } = params
    const student = await User.aggregate([
        {
            $match: {
                _id: mongoose.Types.ObjectId(id),
            },
        },
        {
            $project: {
                email: 1,
                username: 1,
                student: 1,
            },
        },
        {
            $lookup: {
                from: 'students',
                localField: 'student',
                foreignField: '_id',
                as: 'student',
            },
        },
        {
            $lookup: {
                from: 'institudes',
                localField: 'student.institude',
                foreignField: '_id',
                as: 'institude',
            },
        },
        {
            $lookup: {
                from: 'educationprograms',
                localField: 'student.educationProgram',
                foreignField: '_id',
                as: 'educationProgram',
            },
        },
        {
            $lookup: {
                from: 'subjects',
                localField: 'educationProgram.subjects',
                foreignField: '_id',
                as: 'subjects',
            },
        },
    ])

    return student
}

const getListRegisteredUnit = async (params = {}) => {
    const listRegisteredUnit = await Student.find({ ...params }).populate({
        path: 'registerUnitOfStudies',
    })
    return listRegisteredUnit
}

const updateListRegisterUnit = async (data = {}) => {
    const { _id } = data
    const updatedListRegisterUnit = await Student.findOneAndUpdate(
        { _id: _id },
        {
            $set: {
                ...data,
            },
        }
    )
    return updatedListRegisterUnit
}

module.exports = {
    getListRegisteredUnit,
    updateListRegisterUnit,
    getStudentProfile,
}
