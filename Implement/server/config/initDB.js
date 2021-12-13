const EducationProgram = require('../models/educationProgram.model')
const Institude = require('../models/institude.model')
const Subject = require('../models/subject.model')
const User = require('../models/user.model')

const generateUser = async () => {
    const user1 = new User({
        username: 'kto2303',
        email: 'kto2303@gmail.com',
        password: '123',
    })
    const user2 = new User({
        username: 'kto2304',
        email: 'kto2303@gmail.com',
        password: '456',
    })
    await user1.save()
    await user2.save()
    console.log('init database successfully')
}

const generateData = async () => {
    const mathInstitude = new Institude({
        _id: '61af8b6645ff3d2db122f84c',
        name: 'Viện Toán ứng dụng và Tin học',
        institudeCode: 'SAMI',
        description:
            'Viện Toán ứng dụng và Tin học, Trường Đại học Bách khoa Hà Nội, là đơn vị nghiên cứu và đào tạo đại học, sau đại học có uy tín về lĩnh vực Toán học và  Tin học',
        address: '1 Đại Cồ Việt, Hai Bà Trưng, Hà Nội',
        educationPrograms: ['61af9dcdcacfdf2dc94c5b8c'],
    })
    const soict = new Institude({
        _id: '61af8b81c07885175ff699e4',
        name: 'School of Information and Communication Technology',
        institudeCode: 'SOICT',
        description:
            'SoICT 2022 is an international symposium covering four significant research areas that include AI Foundations and Big Data, Communication Networking, Image and Natural Language Processing, Digital Technology trends.',
        address: 'B1 504, No.1, Dai Co Viet Rd, Hanoi, Vietnam',
        educationPrograms: ['61af9dcdcacfdf2dc94c5b8d'],
    })
    await mathInstitude.save()
    await soict.save()

    const math1 = new Subject({
        _id: '61af94c19fe67c64889d3687',
        name: 'AnalysisI',
        code: 'MI1110',
        description: '',
        credit: 3,
        institude: '61af8b6645ff3d2db122f84c',
    })
    const math2 = new Subject({
        _id: '61af94c19fe67c64889d3688',
        name: 'AnalysisII',
        code: 'MI1120',
        description: '',
        credit: 3,
        institude: '61af8b6645ff3d2db122f84c',
    })
    const math3 = new Subject({
        _id: '61af94c19fe67c64889d3689',
        name: 'AnalysisIII',
        code: 'MI1130',
        description: '',
        credit: 3,
        institude: '61af8b6645ff3d2db122f84c',
    })
    const math4 = new Subject({
        _id: '61af94c19fe67c64889d368a',
        name: 'Algelbra',
        code: 'MI1141',
        description: '',
        credit: 3,
        institude: '61af8b6645ff3d2db122f84c',
    })
    const it1 = new Subject({
        _id: '61af94c19fe67c64889d368b',
        name: 'Data Structures and Algorithms',
        code: 'IT3011',
        description: '',
        credit: 3,
        institude: '61af8b81c07885175ff699e4',
    })
    const it2 = new Subject({
        _id: '61af94c19fe67c64889d368c',
        name: 'Object-Oriented Programming',
        code: 'IT3100',
        description: '',
        credit: 3,
        institude: '61af8b81c07885175ff699e4',
    })
    const it3 = new Subject({
        _id: '61af94c19fe67c64889d368d',
        name: 'Database',
        code: 'IT3090',
        description: '',
        credit: 3,
        institude: '61af8b81c07885175ff699e4',
    })
    const it4 = new Subject({
        _id: '61af94c19fe67c64889d368e',
        name: 'Programming Techniques',
        code: 'IT3040',
        description: '',
        credit: 3,
        institude: '61af8b81c07885175ff699e4',
    })
    await math1.save()
    await math2.save()
    await math3.save()
    await math4.save()
    await it1.save()
    await it2.save()
    await it3.save()
    await it4.save()

    const educationProgram1 = new EducationProgram({
        _id: '61af9dcdcacfdf2dc94c5b8c',
        code: 'IT1',
        name: 'Information and Technology',
        subjects: [
            '61af94c19fe67c64889d3687',
            '61af94c19fe67c64889d3688',
            '61af94c19fe67c64889d368b',
            '61af94c19fe67c64889d368c',
            '61af94c19fe67c64889d368d',
            '61af94c19fe67c64889d368e',
        ],
    })
    const educationProgram2 = new EducationProgram({
        _id: '61af9dcdcacfdf2dc94c5b8d',
        code: 'MI1',
        name: 'Mathematics and Information Science',
        subjects: [
            '61af94c19fe67c64889d3687',
            '61af94c19fe67c64889d3688',
            '61af94c19fe67c64889d3689',
            '61af94c19fe67c64889d368a',
        ],
    })
    await educationProgram1.save()
    await educationProgram2.save()
    console.log('Done')
}

module.exports = {
    generateUser,
    generateData,
}
