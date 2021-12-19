import { message, Tabs } from 'antd'
import React, { createContext, useContext, useState, useEffect } from 'react'
import OpenClassTab from './OpenClassTab'
import RegisterClassTab from './RegisterClassTab'
import { RequestMethods } from '../../../global/Constants'
import sendRequest from '../../../helpers/requestHelpers'
import { useGlobalContext } from '../../../global/GlobalContext'

const { TabPane } = Tabs

const ClassContext = createContext()

export const useClassContext = () => useContext(ClassContext)

export default function Class() {
    const { user } = useGlobalContext()
    const [listClass, setListClass] = useState([])
    const [student, setStudent] = useState({})

    const convertDate = (data) => {
        switch (data) {
            case 2: {
                return 'Monday'
            }
            case 3: {
                return 'Tuesday'
            }
            case 4: {
                return 'Wednesday'
            }
            case 5: {
                return 'Thursday'
            }
            case 6: {
                return 'Friday'
            }
            default:
                break
        }
    }

    const fetchStudentData = async(data = {}) => {
        const response = await sendRequest({
            method: RequestMethods.GET,
            url: 'http://localhost:4001/v1/student/student-profile',
            data: {
                id: user,
            },
        })
        if (response) {
            setStudent(response.data.content[0])
        } else {
            message.error('Fetch student data failed!')
        }
    }

    const fetchData = async (data = {}) => {
        const response = await sendRequest({
            url: 'http://localhost:4001/v1/training-department/class',
            method: RequestMethods.GET,
            data: data,
        })
        if (response) {
            setListClass(
                response.data.content.map((i) => ({
                    _id: i._id,
                    key: i.code,
                    code: i.code,
                    subjectName: i.subjectId.name,
                    subjectId: i.subjectId._id,
                    subjectCode: i.subjectId.code,
                    time: `${convertDate(i.time.day)} - Shift: ${i.time.shift}`,
                    time_number: {
                        day: i.time.day,
                        shift: i.time.shift,
                    },
                    position: i.position,
                    students: i.students,
                    numberRegisteredStudent: i.students.length,
                    maximum: i.maximum,
                }))
            )
        } else {
            message.error('Get open class failed!')
        }
    }

    useEffect(() => {
        fetchStudentData()
        fetchData()
        // eslint-disable-next-line
    }, [])

    const value = { listClass, fetchData, setListClass, student: student?.student?.[0], user}

    return (
        <ClassContext.Provider value={value}>
            <Tabs defaultActiveKey="1" type="card" style={{ margin: '10px' }}>
                <TabPane tab="Open Class" key="1">
                    <OpenClassTab />
                </TabPane>
                <TabPane tab="Register Class" key="2">
                    <RegisterClassTab />
                </TabPane>
            </Tabs>
        </ClassContext.Provider>
    )
}
