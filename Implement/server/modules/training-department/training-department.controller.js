const createHttpError = require('http-errors')
const TrainingService = require('./training-department.service')

const getTimestamp = async (req, res, next) => {
    try {
        const data = await TrainingService.getTimestamp()
        return res.status(200).send({
            success: true,
            message: 'get_data_success',
            content: data,
        })
    } catch (err) {
        next(createHttpError.BadRequest(err))
    }
}

const createTimestamp = async (req, res, next) => {
    try {
        const data = await TrainingService.createTimestamp(req.body)
        return res.status(200).send({
            success: true,
            message: 'get_data_success',
            content: data,
        })
    } catch (err) {
        next(createHttpError.BadRequest(err))
    }
}

const updateTimestamp = async (req, res, next) => {
    try {
        const data = await TrainingService.updateTimestamp(req.body)
        return res.status(200).send({
            success: true,
            message: 'get_data_success',
            content: data,
        })
    } catch (err) {
        next(createHttpError.BadRequest(err))
    }
}

const getAllStudents = async (req, res, next) => {
    try {
        const data = await TrainingService.getAllStudents()
        return res.status(200).send({
            success: true,
            message: 'get_data_success',
            content: data,
        })
    } catch (err) {
        next(createHttpError.BadRequest(err))
    }
}

const removeStudentsOfClass = async (req, res, next) => {
    try {
        const updateData = req.body
        const data = await TrainingService.removeStudentsOfClass(updateData)
        return res.status(200).send({
            success: true,
            message: 'get_data_success',
            content: data,
        })
    } catch (err) {
        next(createHttpError.BadRequest(err))
    }
}

const getListSubjects = async (req, res, next) => {
    try {
        const data = await TrainingService.getListSubjects(req.body)
        return res.status(200).send({
            success: true,
            message: 'get_data_success',
            content: data,
        })
    } catch (err) {
        next(createHttpError.BadRequest(err))
    }
}

const createNewSubject = async (req, res, next) => {
    try {
        console.log(req.body)
        const data = await TrainingService.createNewSubject(req.body)
        return res.status(200).send({
            success: true,
            message: 'get_data_success',
            content: data,
        })
    } catch (err) {
        next(createHttpError.BadRequest(err))
    }
}

const updateSubject = async (req, res, next) => {
    try {
        const data = await TrainingService.updateSubject(req.body)
        return res.status(200).send({
            success: true,
            message: 'get_data_success',
            content: data,
        })
    } catch (err) {
        next(createHttpError.BadRequest(err))
    }
}

const deleteSubject = async (req, res, next) => {
    try {
        const data = await TrainingService.deleteSubject(req.body)
        return res.status(200).send({
            success: true,
            message: 'get_data_success',
            content: data,
        })
    } catch (err) {
        console.log(err)
        next(createHttpError.BadRequest(err))
    }
}

const getListClass = async (req, res, next) => {
    try {
        const params = req.query
        const data = await TrainingService.getListClass(params)
        return res.status(200).send({
            success: true,
            message: 'get_data_success',
            content: data,
        })
    } catch (err) {
        next(createHttpError.BadRequest(err))
    }
}

const createNewClass = async (req, res, next) => {
    try {
        const data = await TrainingService.createNewClass(req.body)
        return res.status(200).send({
            success: true,
            message: 'get_data_success',
            content: data,
        })
    } catch (err) {
        next(createHttpError.BadRequest(err))
    }
}

const updateClass = async (req, res, next) => {
    try {
        const data = await TrainingService.updateClass(req.body)
        return res.status(200).send({
            success: true,
            message: 'get_data_success',
            content: data,
        })
    } catch (err) {
        next(createHttpError.BadRequest(err))
    }
}

const deleteClass = async (req, res, next) => {
    try {
        const data = await TrainingService.deleteClass(req.body)
        return res.status(200).send({
            success: true,
            message: 'get_data_success',
            content: data,
        })
    } catch (err) {
        next(createHttpError.BadRequest(err))
    }
}

const getListRegisterUnit = async (req, res, next) => {
    try {
        console.log(req.query)
        const data = await TrainingService.getListRegisterUnit(req.query)
        return res.status(200).send({
            success: true,
            message: 'get_data_success',
            content: data,
        })
    } catch (err) {
        next(createHttpError.BadRequest(err))
    }
}

const getListEducationProgram = async (req, res, next) => {
    try {
        const data = await TrainingService.getEducationProgram(req.body)
        return res.status(200).send({
            success: true,
            message: 'get_data_success',
            content: data,
        })
    } catch (err) {
        next(createHttpError.BadRequest(err))
    }
}

const createNewEducationProgram = async (req, res, next) => {
    try {
        const data = 'await createNewEducationProgram(data)'
        return res.status(200).send({
            success: true,
            message: 'get_data_success',
            content: data,
        })
    } catch (err) {
        next(createHttpError.BadRequest(err))
    }
}

const updateEducationProgram = async (req, res, next) => {
    try {
        const data = 'await updateEducationProgram(data)'
        return res.status(200).send({
            success: true,
            message: 'get_data_success',
            content: data,
        })
    } catch (err) {
        next(createHttpError.BadRequest(err))
    }
}

const deleteEducationProgram = async (req, res, next) => {
    try {
        const data = 'await deleteEducationProgram(data)'
        return res.status(200).send({
            success: true,
            message: 'get_data_success',
            content: data,
        })
    } catch (err) {
        next(createHttpError.BadRequest(err))
    }
}

module.exports = {
    getTimestamp,
    createTimestamp,
    updateTimestamp,
    getAllStudents,
    removeStudentsOfClass,
    getListRegisterUnit,
    getListSubjects,
    createNewSubject,
    deleteSubject,
    updateSubject,
    getListClass,
    createNewClass,
    deleteClass,
    updateClass,
    getListEducationProgram,
    createNewEducationProgram,
    updateEducationProgram,
    deleteEducationProgram,
}
