const EducationProgram = require('../models/educationProgram.model')
const Institude = require('../models/institude.model')
const Subject = require('../models/subject.model')
const User = require('../models/user.model')
const Class = require('../models/class.model')
const Student = require('../models/student.model')

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
    const admin = new User({
        _id: '61bc89e654002066071c7f62',
        username: 'admin',
        email: 'admin_mng@gmail.com',
        password: '1'
    })
    await admin.save()

    const accountStudent1 = new User({
        username: 'TVK20183933',
        email: 'kto2303@gmail.com',
        password: '123',
        student: '61bc89e654002066071c7f60'
    })

    const accountStudent2 = new User({
        username: 'NHN20183934',
        email: 'nhn2304@gmail.com',
        password: '123',
        student: '61bc89e654002066071c7f61'
    })

    const student1 = new Student({
        _id: '61bc89e654002066071c7f60',
        name: 'To Viet Khanh',
        studentId: '20183933',
        status: 'learning',
        yearOfAdmission: 2018,
        educationProgram: '61af9dcdcacfdf2dc94c5b8c',
        institude: '61af8b81c07885175ff699e4',
        registerUnitOfStudies: [],
    })

    const student2 = new Student({
        _id: '61bc89e654002066071c7f61',
        name: 'Nguyen Hoang Nam',
        studentId: '20183934',
        status: 'learning',
        yearOfAdmission: 2018,
        educationProgram: '61af9dcdcacfdf2dc94c5b8d',
        institude: '61af8b6645ff3d2db122f84c',
        registerUnitOfStudies: [],
    })

    await accountStudent1.save()
    await accountStudent2.save()
    await student1.save()
    await student2.save()


    const mathInstitude = new Institude({
        _id: '61af8b6645ff3d2db122f84c',
        name: 'Viện Toán ứng dụng và Tin học',
        institudeCode: 'SAMI',
        description:
            'Viện Toán ứng dụng và Tin học, Trường Đại học Bách khoa Hà Nội, là đơn vị nghiên cứu và đào tạo đại học, sau đại học có uy tín về lĩnh vực Toán học và  Tin học',
        address: '1 Đại Cồ Việt, Hai Bà Trưng, Hà Nội',
        educationPrograms: ['61af9dcdcacfdf2dc94c5b8d'],
    })
    const soict = new Institude({
        _id: '61af8b81c07885175ff699e4',
        name: 'School of Information and Communication Technology',
        institudeCode: 'SOICT',
        description:
            'SoICT 2022 is an international symposium covering four significant research areas that include AI Foundations and Big Data, Communication Networking, Image and Natural Language Processing, Digital Technology trends.',
        address: 'B1 504, No.1, Dai Co Viet Rd, Hanoi, Vietnam',
        educationPrograms: ['61af9dcdcacfdf2dc94c5b8c'],
    })
    await mathInstitude.save()
    await soict.save()

    const math1 = new Subject({
        _id: '61bc12856e3b302f565a9d00',
        name: 'AnalysisI',
        code: 'MI1110',
        description: '',
        credit: 3,
        institude: '61af8b6645ff3d2db122f84c',
    })
    const math2 = new Subject({
        _id: '61bc12856e3b302f565a9d01',
        name: 'AnalysisII',
        code: 'MI1120',
        description: '',
        credit: 3,
        institude: '61af8b6645ff3d2db122f84c',
    })
    const math3 = new Subject({
        _id: '61bc12856e3b302f565a9d02',
        name: 'AnalysisIII',
        code: 'MI1130',
        description: '',
        credit: 3,
        institude: '61af8b6645ff3d2db122f84c',
    })
    const math4 = new Subject({
        _id: '61bc12856e3b302f565a9d03',
        name: 'Algelbra',
        code: 'MI1141',
        description: '',
        credit: 3,
        institude: '61af8b6645ff3d2db122f84c',
    })
    const math5 = new Subject({
        _id: '61bc12856e3b302f565a9d04',
        name: 'Math III',
        code: 'MI1034',
        description: '',
        credit: 5,
        institude: '61af8b6645ff3d2db122f84c',
    })
    const math6 = new Subject({
        _id: '61bc12856e3b302f565a9d05',
        name: 'General Mathematics III',
        code: 'MI1037',
        description: '',
        credit: 2,
        institude: '61af8b6645ff3d2db122f84c',
    })
    const math7 = new Subject({
        _id: '61bc12856e3b302f565a9d06',
        name: 'Differential Equations and Series',
        code: 'MI1040',
        description: '',
        credit: 3,
        institude: '61af8b6645ff3d2db122f84c',
    })
    const math8 = new Subject({
        _id: '61bc12856e3b302f565a9d07',
        name: 'General Mathematics IV',
        code: 'MI1047',
        description: '',
        credit: 2,
        institude: '61af8b6645ff3d2db122f84c',
    })
    const math9 = new Subject({
        _id: '61bc12856e3b302f565a9d08',
        name: 'Numerical Methods',
        code: 'MI2010',
        description: '',
        credit: 2,
        institude: '61af8b6645ff3d2db122f84c',
    })
    const math10 = new Subject({
        _id: '61bc12856e3b302f565a9d09',
        name: 'Probability and Statistics',
        code: 'MI2020',
        description: '',
        credit: 3,
        institude: '61af8b6645ff3d2db122f84c',
    })
    const it1 = new Subject({
        _id: '61bc12856e3b302f565a9d0a',
        name: 'Data Structures and Algorithms',
        code: 'IT3011',
        description: '',
        credit: 3,
        institude: '61af8b81c07885175ff699e4',
    })
    const it2 = new Subject({
        _id: '61bc12856e3b302f565a9d0b',
        name: 'Object-Oriented Programming',
        code: 'IT3100',
        description: '',
        credit: 3,
        institude: '61af8b81c07885175ff699e4',
    })
    const it3 = new Subject({
        _id: '61bc12856e3b302f565a9d0c',
        name: 'Database',
        code: 'IT3090',
        description: '',
        credit: 3,
        institude: '61af8b81c07885175ff699e4',
    })
    const it4 = new Subject({
        _id: '61bc12856e3b302f565a9d0d',
        name: 'Programming Techniques',
        code: 'IT3040',
        description: '',
        credit: 3,
        institude: '61af8b81c07885175ff699e4',
    })
    const it5 = new Subject({
        _id: '61bc12856e3b302f565a9d0e',
        name: 'Operating Systems',
        code: 'IT3070',
        description: '',
        credit: 3,
        institude: '61af8b81c07885175ff699e4',
    })
    const it6 = new Subject({
        _id: '61bc12856e3b302f565a9d0f',
        name: 'Computers NetWorks',
        code: 'IT3080',
        description: '',
        credit: 3,
        institude: '61af8b81c07885175ff699e4',
    })
    const it7 = new Subject({
        _id: '61bc12856e3b302f565a9d10',
        name: 'Linux and Opensource Software',
        code: 'IT3110',
        description: '',
        credit: 2,
        institude: '61af8b81c07885175ff699e4',
    })
    const it8 = new Subject({
        _id: '61bc12856e3b302f565a9d11',
        name: 'Introduction to Artifical Intelligence',
        code: 'IT3160',
        description: '',
        credit: 3,
        institude: '61af8b81c07885175ff699e4',
    })
    const it9 = new Subject({
        _id: '61bc12856e3b302f565a9d12',
        name: 'Introduction to Computer Science',
        code: 'IT1020',
        description: '',
        credit: 3,
        institude: '61af8b81c07885175ff699e4',
    })
    const it10 = new Subject({
        _id: '61bc12856e3b302f565a9d13',
        name: 'Introduction to ICT',
        code: 'IT2000',
        description: '',
        credit: 3,
        institude: '61af8b81c07885175ff699e4',
    })
    await math1.save()
    await math2.save()
    await math3.save()
    await math4.save()
    await math5.save()
    await math6.save()
    await math7.save()
    await math8.save()
    await math9.save()
    await math10.save()
    await it1.save()
    await it2.save()
    await it3.save()
    await it4.save()
    await it5.save()
    await it6.save()
    await it7.save()
    await it8.save()
    await it9.save()
    await it10.save()

    const educationProgram1 = new EducationProgram({
        _id: '61af9dcdcacfdf2dc94c5b8c',
        code: 'IT1',
        name: 'Information and Technology',
        subjects: [
            '61bc12856e3b302f565a9d00',
            '61bc12856e3b302f565a9d01',
            '61bc12856e3b302f565a9d02',
            '61bc12856e3b302f565a9d03',
            '61bc12856e3b302f565a9d04',
            '61bc12856e3b302f565a9d05',
            '61bc12856e3b302f565a9d0a',
            '61bc12856e3b302f565a9d0b',
            '61bc12856e3b302f565a9d0c',
            '61bc12856e3b302f565a9d0d',
            '61bc12856e3b302f565a9d0e',
            '61bc12856e3b302f565a9d0f',
            '61bc12856e3b302f565a9d10',
            '61bc12856e3b302f565a9d11',
            '61bc12856e3b302f565a9d12',
            '61bc12856e3b302f565a9d12',
        ],
    })
    const educationProgram2 = new EducationProgram({
        _id: '61af9dcdcacfdf2dc94c5b8d',
        code: 'MI1',
        name: 'Mathematics and Information Science',
        subjects: [
            '61bc12856e3b302f565a9d00',
            '61bc12856e3b302f565a9d01',
            '61bc12856e3b302f565a9d02',
            '61bc12856e3b302f565a9d03',
            '61bc12856e3b302f565a9d04',
            '61bc12856e3b302f565a9d05',
            '61bc12856e3b302f565a9d06',
            '61bc12856e3b302f565a9d07',
            '61bc12856e3b302f565a9d08',
            '61bc12856e3b302f565a9d09',
        ],
    })
    await educationProgram1.save()
    await educationProgram2.save()

    const class1 = new Class({
        _id: '61bc08a14aa1d8275dce0c00',
        code: 100000,
        time: {
            day: 2,
            shift: 3,
        },
        position: 'TC-301',
        subjectId: '61bc12856e3b302f565a9d00',
        maximum: 100,
    })
    const class2 = new Class({
        _id: '61bc08a14aa1d8275dce0c01',
        code: 100001,
        time: {
            day: 5,
            shift: 2,
        },
        position: 'TC-302',
        subjectId: '61bc12856e3b302f565a9d01',
        maximum: 100,
    })
    const class3 = new Class({
        _id: '61bc08a14aa1d8275dce0c02',
        code: 100003,
        time: {
            day: 3,
            shift: 4,
        },
        position: 'TC-303',
        subjectId: '61bc12856e3b302f565a9d02',
        maximum: 100,
    })
    const class4 = new Class({
        _id: '61bc08a14aa1d8275dce0c03',
        code: 100004,
        time: {
            day: 3,
            shift: 1,
        },
        position: 'TC-304',
        subjectId: '61bc12856e3b302f565a9d03',
        maximum: 100,
    })
    const class5 = new Class({
        _id: '61bc08a14aa1d8275dce0c04',
        code: 100005,
        time: {
            day: 4,
            shift: 2,
        },
        position: 'TC-305',
        subjectId: '61bc12856e3b302f565a9d04',
        maximum: 100,
    })
    const class6 = new Class({
        _id: '61bc08a14aa1d8275dce0c05',
        code: 100006,
        time: {
            day: 2,
            shift: 3,
        },
        position: 'TC-306',
        subjectId: '61bc12856e3b302f565a9d05',
        maximum: 100,
    })
    const class7 = new Class({
        _id: '61bc08a14aa1d8275dce0c06',
        code: 100007,
        time: {
            day: 6,
            shift: 2,
        },
        position: 'TC-307',
        subjectId: '61bc12856e3b302f565a9d06',
        maximum: 100,
    })
    const class8 = new Class({
        _id: '61bc08a14aa1d8275dce0c07',
        code: 100008,
        time: {
            day: 2,
            shift: 3,
        },
        position: 'TC-301',
        subjectId: '61bc12856e3b302f565a9d07',
        maximum: 100,
    })
    const class9 = new Class({
        _id: '61bc08a14aa1d8275dce0c08',
        code: 100009,
        time: {
            day: 4,
            shift: 2,
        },
        position: 'TC-301',
        subjectId: '61bc12856e3b302f565a9d08',
        maximum: 100,
    })
    const class10 = new Class({
        _id: '61bc08a14aa1d8275dce0c09',
        code: 100010,
        time: {
            day: 5,
            shift: 1,
        },
        position: 'TC-301',
        subjectId: '61bc12856e3b302f565a9d09',
        maximum: 100,
    })
    const class11 = new Class({
        _id: '61bc08a14aa1d8275dce0c0a',
        code: 100011,
        time: {
            day: 4,
            shift: 2,
        },
        position: 'TC-301',
        subjectId: '61bc12856e3b302f565a9d0a',
        maximum: 100,
    })
    const class12 = new Class({
        _id: '61bc08a14aa1d8275dce0c0b',
        code: 100012,
        time: {
            day: 2,
            shift: 3,
        },
        position: 'TC-301',
        subjectId: '61bc12856e3b302f565a9d0b',
        maximum: 100,
    })
    const class13 = new Class({
        _id: '61bc08a14aa1d8275dce0c0c',
        code: 100013,
        time: {
            day: 6,
            shift: 2,
        },
        position: 'TC-301',
        subjectId: '61bc12856e3b302f565a9d0c',
        maximum: 100,
    })
    const class14 = new Class({
        _id: '61bc08a14aa1d8275dce0c0d',
        code: 100014,
        time: {
            day: 2,
            shift: 3,
        },
        position: 'TC-301',
        subjectId: '61bc12856e3b302f565a9d0d',
        maximum: 100,
    })
    const class15 = new Class({
        _id: '61bc08a14aa1d8275dce0c0e',
        code: 100015,
        time: {
            day: 2,
            shift: 3,
        },
        position: 'TC-301',
        subjectId: '61bc12856e3b302f565a9d0e',
        maximum: 100,
    })
    const class16 = new Class({
        _id: '61bc08a14aa1d8275dce0c0f',
        code: 100016,
        time: {
            day: 4,
            shift: 2,
        },
        position: 'TC-301',
        subjectId: '61bc12856e3b302f565a9d0f',
        maximum: 100,
    })
    const class17 = new Class({
        _id: '61bc08a14aa1d8275dce0c10',
        code: 100017,
        time: {
            day: 3,
            shift: 1,
        },
        position: 'TC-301',
        subjectId: '61bc12856e3b302f565a9d10',
        maximum: 100,
    })
    const class18 = new Class({
        _id: '61bc08a14aa1d8275dce0c11',
        code: 100018,
        time: {
            day: 3,
            shift: 4,
        },
        position: 'TC-301',
        subjectId: '61bc12856e3b302f565a9d11',
        maximum: 100,
    })
    const class19 = new Class({
        _id: '61bc08a14aa1d8275dce0c12',
        code: 100019,
        time: {
            day: 5,
            shift: 2,
        },
        position: 'TC-301',
        subjectId: '61bc12856e3b302f565a9d12',
        maximum: 100,
    })
    const class20 = new Class({
        _id: '61bc08a14aa1d8275dce0c13',
        code: 100020,
        time: {
            day: 4,
            shift: 3,
        },
        position: 'TC-301',
        subjectId: '61bc12856e3b302f565a9d13',
        maximum: 100,
    })

    await class1.save()
    await class2.save()
    await class3.save()
    await class4.save()
    await class5.save()
    await class6.save()
    await class7.save()
    await class8.save()
    await class9.save()
    await class10.save()
    await class11.save()
    await class12.save()
    await class13.save()
    await class14.save()
    await class15.save()
    await class16.save()
    await class17.save()
    await class18.save()
    await class19.save()
    await class20.save()

    console.log('Done')
}

module.exports = {
    generateUser,
    generateData,
}
