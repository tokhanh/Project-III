const Student = require('../../models/student.model')
const User = require('../../models/user.model')
const mongoose = require('mongoose')
const Class = require('../../models/class.model')
const Term = require('../../models/term.model')
const EducationProgram = require('../../models/educationProgram.model')

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
        }
    ])
    const listSubject = await EducationProgram.find({_id: student[0].educationProgram[0]._id}).populate({
        path: 'subjects',
        populate: {
            path: 'institude'
        }
    })

    return {
        student: student,
        subjectInfo: listSubject[0].subjects
    }
}

const getListRegisteredUnit = async (params = {}) => {
    const { studentId, semester } = params
    const result = await Term.find({
        studentId: studentId,
    }).populate({
        path: 'subject',
    })
    return result
}

const updateListRegisterUnit = async (data = {}) => {
    const { studentId, listRegister } = data
    await Term.deleteMany({ studentId: studentId })
    await Term.insertMany(listRegister)
    return 'true'
}

const updateClass = async (data = {}) => {
    const { sid, inClass, semester } = data
    
    await Class.updateMany(
        { semester: semester },
        {
            $pull: {
                students: mongoose.Types.ObjectId(sid),
            },
        },
        { multi: true }
    )
    await Class.updateMany(
        {
            _id: {
                $in: [...inClass.map((i) => mongoose.Types.ObjectId(i))],
            },
        },
        {
            $push: { students: mongoose.Types.ObjectId(sid) },
        }
    )
    return 'update data success'
}

module.exports = {
    getListRegisteredUnit,
    updateListRegisterUnit,
    getStudentProfile,
    updateClass,
}
