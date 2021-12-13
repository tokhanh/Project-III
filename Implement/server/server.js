const express = require('express')
const helmet = require('helmet')
const config = require('./config/config')
const bodyParser = require('body-parser')
require('./helpers/connectDB')

const userRouter = require('./modules/user/user.route')
const studentRouter = require('./modules/student/student.route')
const trainingDepartmentRouter = require('./modules/training-department/training-department.route')

const { generateUser, generateData } = require('./config/initDB')
const app = express()

app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)
app.use(bodyParser.json())
app.use(helmet())

app.use('/v1/user', userRouter)
app.use('/v1/student', studentRouter)
app.use('/v1/training-department', trainingDepartmentRouter)

const handleError = (err, req, res, next) => {
    res.status(err.status || 500).json({
        status: err.status || 500,
        message: err.message,
    })
}

app.use(handleError)

app.listen(config.PORT)
