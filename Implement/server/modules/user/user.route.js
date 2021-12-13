const express = require('express')
const userController = require('./user.controller')

const router = express.Router()

router.post('/login', userController.login)

router.post('/register', userController.register)

router.post('/reset-password', userController.recoveryTokenToEmail)

router.post(
    '/reset-password/:userId/:recoveryToken',
    userController.resetPassword
)

module.exports = router
