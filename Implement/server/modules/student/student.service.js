const Student = require('../../models/student.model')

const getListRegisteredUnit = async (params = {}) => {
    const listRegisteredUnit = await Student.find({ ...params }).populate({
        path: 'registerUnitOfStudies',
    })
    return listRegisteredUnit
}

const updateListRegisterUnit = async (data = {}) => {
    const { _id } = data
    const updatedListRegisterUnit = await Student.findOneAndUpdate(
        { _id: _id },
        {
            $set: {
                ...data,
            },
        }
    )
    return updatedListRegisterUnit
}

module.exports = {
    getListRegisteredUnit,
    updateListRegisterUnit,
}
