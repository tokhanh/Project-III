const Class = require('../../models/class.model')
const EducationProgram = require('../../models/educationProgram.model')
const Subject = require('../../models/subject.model')
const Student = require('../../models/student.model')
const Timestamp = require('../../models/timestamp.model')
const moment = require('moment')

/**Timestamp service */
const getTimestamp = async () => {
    const listTimestamp = await Timestamp.find()
    return listTimestamp
}

const createTimestamp = async () => {
    return 'true'
}

const updateTimestamp = async (data = {}) => {
    const formatDate = 'DD/MM/YYYY HH:mm:ss'
    const timestamp = {
        semester: data.semester,
        registerUnitOfStudyTime: {
            startTime: moment(data.startTimeRegisterUnit, formatDate),
            endTime: moment(data.endTimeRegisterUnit, formatDate),
        },
        registerPriotyClassTime: {
            startTime: moment(
                data.startTimeRegisterPriotyClassTime,
                formatDate
            ),
            endTime: moment(data.endTimeRegisterPriotyClassTime, formatDate),
        },
        registerAdjustedClassTime: {
            startTime: moment(
                data.startTimeRegisterAdjustedClassTime,
                formatDate
            ),
            endTime: moment(data.endTimeRegisterAdjustedClassTime, formatDate),
        },
    }
    const result = await Timestamp.findOneAndUpdate(
        {
            semester: data.semester,
        },
        {
            $set: {
                ...timestamp,
            },
        },
        { new: true }
    )
    return 'done'
}
/*Student service */
const getAllStudents = async (params = {}) => {
    const {} = params
    const keySearch = {}
    const listAllStudents = await Student.find(keySearch)
    return listAllStudents
}

const removeStudentsOfClass = async (params = {}) => {
    const { sid, currentClass } = params
    const result = await Class.findOneAndUpdate(
        {
            _id: currentClass,
        },
        {
            $pull: {
                students: sid,
            },
        }
    )
    return result
}
/**Register unit of study service */
const getListRegisterUnit = async (params = {}) => {
    const {} = params
    const keySearch = {}
    const listStudent = await Student.find(keySearch).populate({
        path: 'registerUnitOfStudies',
    })

    let listUnitOfStudies = []
    for (let student of listStudent) {
        listUnitOfStudies = [...listUnitOfStudies, ...student.registerUnitOfStudies] 
    }

    listUnitOfStudies = listUnitOfStudies.map(i => i.code)
    let listUnitOfStudiesDistinct = listUnitOfStudies.filter((x, i, a) => a.indexOf(x) == i).sort((a, b) => a.toString().localeCompare(b.toString()))

    let listCount = new Array(listUnitOfStudiesDistinct.length).fill(0)
    for(let item of listUnitOfStudies) {
        let index = listUnitOfStudiesDistinct.indexOf(item)
        listCount[index] = listCount[index] + 1
    }

    let listMapUnitOfStudy = new Map()
    for(let i = 0; i < listUnitOfStudiesDistinct.length; i++) {
        listMapUnitOfStudy.set(listUnitOfStudiesDistinct[i], listCount[i])
    }

    return [...listMapUnitOfStudy]
}

/*Subject service*/
const getListSubjects = async (params = {}) => {
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
    const { _id } = data
    // const isExistedId = (await getListSubjects())
    //     .map((item) => item._id.toString())
    //     .find((id) => id == _id)

    if (_id) {
        const updatedSubject = await Subject.updateOne(
            { _id: _id },
            { $set: { ...data } },
            { upsert: true }
        )
        return updatedSubject
    } else throw 'update failed'
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
    const { codeKey } = params
    const keySeach = {}

    let listClass = await Class.find({ ...keySeach }).populate([
        {
            path: 'subjectId',
        },
        {
            path: 'students',
        },
    ])
    if (codeKey) {
        const reg = new RegExp(`${codeKey}`, 'gi')
        listClass = listClass.filter((i) => {
            return i.subjectId.code.toString().match(reg)
        })
    }
    return listClass
}
const createNewClass = async (data = {}) => {
    const newClass = {
        code: data.code,
        time: {
            day: data.time.day,
            shift: data.time.shift,
        },
        position: data.position,
        subjectId: data.subjectId,
        students: [],
        semester: data.semester,
        maximum: data.maximum,
    }
    const _newClass = new Class({
        ...newClass,
    })
    await _newClass.save()
    return 'success'
}

const updateClass = async (data = {}) => {
    const updateClassData = {
        code: data.code,
        time: {
            day: data.defaultTime.day,
            shift: data.defaultTime.shift,
        },
        position: data.position,
        subjectId: data.subject._id,
        students: data.students.map((i) => i._id),
        semester: data.semester,
        maximum: data.maximum,
    }

    const result = await Class.findOneAndUpdate(
        {
            _id: data._id,
        },
        {
            $set: {
                ...updateClassData,
            },
        },
        { new: true }
    )
    return result
}

const deleteClass = async (data = {}) => {
    const { _id } = data
    const result = await Class.deleteOne({ _id: _id })
    return result
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
    getTimestamp,
    createTimestamp,
    updateTimestamp,
    getAllStudents,
    removeStudentsOfClass,
    getListSubjects,
    createNewSubject,
    updateSubject,
    deleteSubject,
    getListRegisterUnit,
    getListClass,
    createNewClass,
    updateClass,
    deleteClass,
    getEducationProgram,
    createNewEducationProgram,
    updateEducationProgram,
    deleteEducationProgram,
}
