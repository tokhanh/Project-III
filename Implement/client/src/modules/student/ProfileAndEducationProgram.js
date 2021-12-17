import { message, Tabs } from 'antd'
import React, { useContext, useEffect, useState } from 'react'
import EducationProgramTab from './EducationProgramTab'
import RegisterUnitOfStudyTab from './RegisterUnitOfStudy'
import StudentProfileTab from './ProfileTab'
import { useGlobalContext } from '../../global/GlobalContext'
import sendRequest from '../../helpers/requestHelpers'
import { RequestMethods } from '../../global/Constants'

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
    })

    async function fetchStudentProfile() {
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
                institude: response.data.content[0].institude[0],
                student: response.data.content[0].student[0],
                educationProgram: {
                    code: response.data.content[0].educationProgram[0].code,
                    name: response.data.content[0].student[0].name,
                    subjects: response.data.content[0].subjects,
                },
            })
        } else {
            message.error('Get student data failed')
        }
    }

    useEffect(() => {
        setLoading(true)
        fetchStudentProfile()
        setLoading(false)
    }, [])

    console.log(studentInfomation)
    const value = { studentInfomation }
    return (
        <StudentContext.Provider value={value}>
            {!loading && (
                <Tabs
                    defaultActiveKey="1"
                    type="card"
                    style={{ margin: '10px' }}
                >
                    <TabPane tab="Profile" key="1">
                        <StudentProfileTab />
                    </TabPane>
                    <TabPane tab="Education Program" key="2">
                        <EducationProgramTab />
                    </TabPane>
                    <TabPane tab="Register Unit Of Study" key="3">
                        <RegisterUnitOfStudyTab />
                    </TabPane>
                </Tabs>
            )}
        </StudentContext.Provider>
    )
}
