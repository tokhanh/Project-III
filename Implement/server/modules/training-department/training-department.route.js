const express = require('express')
const Joi = require('joi')

const TrainingDepartmentController = require('../training-department/training-department.controller')

const router = express.Router()

const validateSubject = (data) => {
    const subjectSchema = Joi.object({
        name: Joi.string(),
        code: Joi.string(),
        credit: Joi.number(),
        institude: Joi.string(),
    })
    return subjectSchema.validate(data)
}

const validateEducationProgram = (data) => {
    const educationProgramSchema = Joi.object({
        code: Joi.string().required(),
        name: Joi.string().required(),
        subjects: Joi.array().items(Joi.string()),
    })
    return educationProgramSchema.validate(data)
}
/**Studen controller */
router.get('/list-student', TrainingDepartmentController.getAllStudents)
router.post('/remove-student-of-class', TrainingDepartmentController.removeStudentsOfClass)

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
