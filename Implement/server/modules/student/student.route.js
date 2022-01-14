const express = require('express')

const StudentController = require('./student.controller')

const router = express.Router()

router.get('/student-profile', StudentController.getProfile)

router.get('/list-register-unit-of-study', StudentController.getListRegisterUnitOfStudy)

router.post('/register-unit-of-study', StudentController.registerUnitOfStudy)

router.get('/class', StudentController.viewClass)

router.post('/register-class', StudentController.registerClass)

module.exports = router
