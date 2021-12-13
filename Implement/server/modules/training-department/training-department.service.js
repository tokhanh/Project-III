const Class = require('../../models/class.model')
const EducationProgram = require('../../models/educationProgram.model')
const Subject = require('../../models/subject.model')

/*Subject service*/
const getListSubjects = async (params) => {
    const {} = params
    const keySearch = {}
    const listSubjects = await Subject.find({ ...keySearch }).populate({
        path: 'institude',
    })
    return listSubjects
}

const createNewSubject = async (data = {}) => {
    const newSubject = await new Subject({
        ...data,
    }).save()
    return newSubject
}

const updateSubject = async (data = {}) => {
    const updatedSubject = await Subject.updateOne({ ...data })
    return updatedSubject
}

const deleteSubject = async (data = {}) => {
    const { _id } = data
    if (_id) {
        const listEducationProgram = await getEducationProgram()
        let listSubjectIds = []
        listEducationProgram
            .map((i) => i.subjects)
            .map((ids) => (listSubjectIds = [...listSubjectIds, ...ids]))
        const result = listSubjectIds.find(
            (i) => i.toString() === ids.toString()
        )
        if (result) {
            throw 'Error: Some education programs also have this subject'
        } else {
            const deletedSubject = await Subject.deleteOne({ ...data })
            return deletedSubject
        }
    } else {
        throw 'Error: id not found'
    }
}

/*Class service*/

const getListClass = async (params = {}) => {
    const {} = params
    const keySeach = {}
    const listClass = await Class.find({ ...keySeach }).populate([
        {
            path: 'subjectId',
        },
        {
            path: 'students',
        },
    ])
    return listClass
}
const createNewClass = async (data = {}) => {
    const newClass = await new Class({
        ...data,
    }).save()
    return newClass
}

const updateClass = async (data = {}) => {
    const updatedClass = await Class.updateMany({ ...data })
    return updatedClass
}

const deleteClass = async (data = {}) => {
    const deletedClass = await Class.delete({ ...data })
    return deletedClass
}

/*Education Program Service */
const getEducationProgram = async (params = {}) => {
    const {} = params
    const keySearch = {}
    const listEducationProgram = await EducationProgram.find({
        ...keySearch,
    }).populate({
        path: 'subjects',
    })
    return listEducationProgram
}

const createNewEducationProgram = async (data = {}) => {
    const newEducation = await new EducationProgram({
        ...data,
    }).save()
    return newEducation
}

const updateEducationProgram = async (data = {}) => {
    const updatedEducationProgram = await EducationProgram.updateOne({
        ...data,
    })
    return updatedEducationProgram
}
const deleteEducationProgram = async (data = {}) => {
    const deletedEducationProgram = await EducationProgram.deleteOne({
        ...data,
    })
    return deletedEducationProgram
}

module.exports = {
    getListSubjects,
    createNewSubject,
    updateSubject,
    deleteSubject,
    getListClass,
    createNewClass,
    updateClass,
    deleteClass,
    getEducationProgram,
    createNewEducationProgram,
    updateEducationProgram,
    deleteEducationProgram,
}
