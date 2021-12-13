const crypto = require('crypto')

const generateRecoveryToken = () => {
    return crypto.randomBytes(32).toString('hex')
}

module.exports = {
    generateRecoveryToken
}
