const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        required: true,
    }
})

userSchema.pre('save', async function (next) {
    try {
        const salt = await bcrypt.genSalt(8)
        const hashPassword = await bcrypt.hash(this.password, salt)
        this.password = hashPassword
        next()
    } catch (err) {
        next(err)
    }
})

userSchema.methods.isCheckPassword = async function (password) {
    try {
        return await bcrypt.compare(password, this.password)
    } catch (err) {
        console.log(err)
    }
}

const User = mongoose.model('User', userSchema)
module.exports = User
