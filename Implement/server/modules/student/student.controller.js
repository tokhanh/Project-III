const createHttpError = require('http-errors')
const StudentService = require('./student.service')

const getProfile = async (req, res, next) => {
    const params = req.query
    try {
        const data = await StudentService.getStudentProfile(params)
        return res.status(200).json({
            success: true,
            message: 'get_data_success',
            content: data,
        })
    } catch (err) {
        next(createHttpError.BadRequest(err))
    }
}

const registerUnitOfStudy = async (req, res, next) => {
    try {
        const data = await StudentService.updateListRegisterUnit(req.body)
        return res.status(200).json({
            success: true,
            message: 'update_data_success',
            content: data,
        })
    } catch (err) {
        next(createHttpError.BadRequest(err))
    }
}

const viewClass = async (req, res, next) => {
    try {
        const data = 'await getListClass(data)'
        return res.status(200).json({
            success: true,
            message: 'update_data_success',
            content: data,
        })
    } catch (err) {
        next(createHttpError.BadRequest(err))
    }
}

const viewRegisteredClass = async (req, res, next) => {
    try {
        const data = 'await viewRegisteredClass(data)'
        return res.status(200).json({
            success: true,
            message: 'get_data_success',
            content: data,
        })
    } catch (err) {
        next(createHttpError.BadRequest(err))
    }
}

const registerClass = async (req, res, next) => {
    try {
        const data = await StudentService.updateClass(req.body)
        return res.status(200).json({
            success: true,
            message: 'update_data_success',
            content: data,
        })
    } catch (err) {
        next(createHttpError.BadRequest(err))
    }
}

module.exports = {
    getProfile,
    viewRegisteredClass,
    viewClass,
    registerClass,
    registerUnitOfStudy,
}
