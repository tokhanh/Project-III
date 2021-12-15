const User = require('../../models/user.model')
const Token = require('../../models/token.model')
const createError = require('http-errors')
const { generateRecoveryToken } = require('../../helpers/generate_key')
const sendMail = require('../../helpers/sendMail')

module.exports = {
    login: async (req, res, next) => {
        try {
            const username = req.body.username
            const password = req.body.password
            const user = await User.findOne({
                username: username,
            })
            if (user) {
                const result = await user.isCheckPassword(password)
                if (result) {
                    return res.send({
                        message: 'success',
                        content: {
                            email: user.email,
                            username: user.username,
                            uid: user._id,
                        },
                    })
                } else {
                    next(createError.BadRequest('Email or password is wrong'))
                }
            } else {
                next(createError.BadRequest('Email or password is wrong'))
            }
        } catch (err) {
            next(createError.InternalServerError())
        }
    },
    register: async (req, res, next) => {
        try {
            const username = req.body.username
            const email = req.body.email
            const password = req.body.password
            const user = await User.findOne({
                username: username,
            })
            if (user) {
                next(createError.BadRequest('An username is existed'))
            } else {
                const result = await new User({
                    username: username,
                    password: password,
                    email: email,
                }).save()
                if (result) {
                    return res.send({
                        message: 'create account success',
                    })
                } else next(createError.InternalServerError())
            }
        } catch (err) {
            console.log(err)
        }
    },
    recoveryTokenToEmail: async (req, res, next) => {
        try {
            const username = req.body.username
            const email = req.body.email

            const user = await User.findOne({
                username: username,
                email: email,
            })
            if (user) {
                const recoveryToken = generateRecoveryToken()

                await new Token({
                    value: recoveryToken,
                    user: user._id,
                }).save()

                const linkRecovery = `http://localhost:4001/v1/user/reset-password/${user._id}/${recoveryToken}`
                await sendMail(email, 'Reset Password', linkRecovery)

                res.send({
                    message: 'success',
                    link: linkRecovery,
                })
            } else {
                next(createError.BadRequest('Username not found'))
            }
        } catch (err) {
            console.log(err)
        }
    },
    resetPassword: async (req, res, next) => {
        try {
            const userId = req.params.userId
            const recoveryToken = req.params.recoveryToken
            const password = req.body.password

            const user = await User.findOne({
                _id: userId,
            })

            if (user) {
                const token = await Token.findOne({
                    user: user._id,
                    value: recoveryToken,
                })
                if (token) {
                    user.password = password
                    await user.save()
                    await token.delete()

                    return res.send({
                        message: 'recovery password success!',
                    })
                } else {
                    return next(createError.NotFound('Link not found'))
                }
            } else {
                next(createError.BadRequest('Username not found'))
            }
        } catch (err) {
            console.log(err)
        }
    },
}
