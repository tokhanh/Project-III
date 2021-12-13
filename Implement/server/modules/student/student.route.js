const express = require('express')

const StudentController = require('./student.controller')

const router = express.Router()

router.get('/student-profile', StudentController.getProfile)

router.post('/register-unit-of-study', StudentController.registerUnitOfStudy)

router.get('/class', StudentController.viewClass)

router.get('/registered-class', StudentController.viewRegisteredClass)

router.post('/registered-class', StudentController.registerClass)

module.exports = router
