const express = require('express')
const createHttpError = require('http-errors')
const Joi = require('joi')

const TrainingDepartmentController = require('../training-department/training-department.controller')

const router = express.Router()

const validateSubjectMiddleware = (req, res, next) => {
    const subjectSchema = Joi.object({
        name: Joi.string().required(),
        code: Joi.string().required(),
        credit: Joi.number().required(),
        institude: Joi.string().required(),
    })
    const validation = subjectSchema.validate(req.body.data)
    if (!validation.value || validation.error) {
        next(createHttpError.BadRequest(validation.error.details))
    } else next()
}

const validateEducationProgramMiddleware = (req, res, next) => {
    const educationProgramSchema = Joi.object({
        code: Joi.string().required(),
        name: Joi.string().required(),
        subjects: Joi.array().items(Joi.string()),
    })
    const validation = educationProgramSchema.validate(req.body.data)
    if (!validation.value || validation.error) {
        next(createHttpError.BadRequest('Bad credentials'))
    } else {
        next()
    }
}
/*Subject controller*/

router.get('/subject', TrainingDepartmentController.getListSubjects)
router.post('/subject', TrainingDepartmentController.createNewSubject)
router.put('/subject', TrainingDepartmentController.updateSubject)
router.delete('/subject', TrainingDepartmentController.deleteSubject)

/*Class controller */

router.get('/class', TrainingDepartmentController.getListClass)

router.post('/class', TrainingDepartmentController.createNewClass)

router.put('/class', TrainingDepartmentController.updateClass)

router.delete('/class', TrainingDepartmentController.deleteClass)

/*Education Controller */

router.get('/education', TrainingDepartmentController.getListEducationProgram)

router.post(
    '/education',
    TrainingDepartmentController.createNewEducationProgram
)

router.put('/education', TrainingDepartmentController.updateEducationProgram)

router.delete('/education', TrainingDepartmentController.deleteEducationProgram)

module.exports = router
