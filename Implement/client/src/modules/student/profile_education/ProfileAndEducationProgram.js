import { message, Tabs } from 'antd'
import React, { useContext, useEffect, useState } from 'react'
import EducationProgramTab from './EducationProgramTab'
import RegisterUnitOfStudyTab from './RegisterUnitOfStudy'
import ProfileTab from './ProfileTab'
import { useGlobalContext } from '../../../global/GlobalContext'
import sendRequest from '../../../helpers/requestHelpers'
import { RequestMethods } from '../../../global/Constants'

const { TabPane } = Tabs

const StudentContext = React.createContext()

export function useStudentContext() {
    return useContext(StudentContext)
}

export default function ProfileAndEducationProgram() {
    const { user } = useGlobalContext()
    const [loading, setLoading] = useState(false)
    const [studentInfomation, setStudentInformation] = useState({
        student: {},
        institude: {},
        educationProgram: {},
        registerUnitOfStudies: []
    })

    async function fetchStudentProfile() {
        setLoading(true)
        const response = await sendRequest({
            method: RequestMethods.GET,
            url: 'http://localhost:4001/v1/student/student-profile',
            data: {
                id: user,
            },
        })
        if (response) {
            setStudentInformation({
                ...studentInfomation,
                institude: response.data.content[0]?.institude[0],
                student: response.data.content[0]?.student[0],
                educationProgram: {
                    code: response.data.content[0].educationProgram[0]?.code,
                    name: response.data.content[0].student[0]?.name,
                    subjects: response.data.content[0]?.subjects,
                    limitOfCredits: response.data.content[0]?.educationProgram[0]?.maxLimitOfCredit
                },
                registerUnitOfStudies: response.data.content[0]?.student[0]?.registerUnitOfStudies,
            })
            setLoading(false)
        } else {
            message.error('Lấy dữ liệu sinh viên thất bại !')
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchStudentProfile()
        // eslint-disable-next-line
    }, [])

    const value = {
        studentInfomation,
        setStudentInformation,
        student: studentInfomation.student,
        educationProgram: studentInfomation.educationProgram,
        institude: studentInfomation.institude,
        registerUnitOfStudies: studentInfomation.registerUnitOfStudies
    }
    return (
        <StudentContext.Provider value={value}>
            {!loading && (
                <Tabs
                    defaultActiveKey="1"
                    type="card"
                    style={{ margin: '10px' }}
                >
                    <TabPane tab="Hồ sơ" key="1">
                        <ProfileTab />
                    </TabPane>
                    <TabPane tab="Chương trình đào tạo" key="2">
                        <EducationProgramTab />
                    </TabPane>
                    <TabPane tab="Đăng ký học phần " key="3">
                        <RegisterUnitOfStudyTab />
                    </TabPane>
                </Tabs>
            )}
        </StudentContext.Provider>
    )
}
