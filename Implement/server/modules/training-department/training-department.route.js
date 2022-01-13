const express = require('express')
const Joi = require('joi')

const TrainingDepartmentController = require('../training-department/training-department.controller')

const router = express.Router()

/**Timestamp */
router.get('/timestamp', TrainingDepartmentController.getTimestamp)
router.post('/timestamp', TrainingDepartmentController.createTimestamp)
router.put('/timestamp', TrainingDepartmentController.updateTimestamp)
/**Student controller */
router.get('/list-student', TrainingDepartmentController.getAllStudents)
router.post('/remove-student-of-class', TrainingDepartmentController.removeStudentsOfClass)
/**Register unit of study controller */
router.get('/listRegister', TrainingDepartmentController.getListRegisterUnit)

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
