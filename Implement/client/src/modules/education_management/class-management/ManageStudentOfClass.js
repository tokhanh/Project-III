import React, { useEffect, useState } from 'react'
import {
    Space,
    Table,
    Typography,
    Input,
    Button,
    Modal,
    message,
    Select,
} from 'antd'
import sendRequest from '../../../helpers/requestHelpers'
import { RequestMethods } from '../../../global/Constants'

const { Text } = Typography
const { Option } = Select

export default function ManageStudentOfClass(props) {
    const { data, listAllStudent } = props
    const [listStudent, setListStudent] = useState(data.students)
    const [searchValue, setSearchValue] = useState('')
    const [currentStudent, setCurrentStudent] = useState({})
    const [currentAddStudent, setCurrentAddStudent] = useState('')

    const handleSearch = () => {
        const pattern = new RegExp(searchValue, 'gi')
        setListStudent(
            data.students.filter((i) => pattern.test(i.studentId.toString()))
        )
    }

    const onSelectStudent = (value) => {
        setCurrentAddStudent(value)
    }

    useEffect(() => {
        setListStudent(data.students)
    }, [JSON.stringify(data)])

    const handleRemoveStudent = async () => {
        const currentClass = data._id
        const sid = currentStudent._id
        const response = await sendRequest({
            method: RequestMethods.POST,
            url: 'http://localhost:4001/v1/training-department/remove-student-of-class',
            data: {
                currentClass: currentClass,
                sid: sid,
            },
        })
        if (response) {
            setListStudent(
                data.students.filter(
                    (student) =>
                        student._id.toString() !== currentStudent._id.toString()
                )
            )
            message.success('Remove student successfully!')
        } else {
            message.error('Remove student failed!')
        }
    }
    const columns = [
        {
            title: 'Student ID',
            dataIndex: 'studentId',
            key: 'studentId',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Action',
            dataIndex: 'action',
            render: (text, record) => (
                <Space size="middle">
                    {/* eslint-disable-next-line */}
                    <a onClick={() => handleOpenConfirmModal(record)}>
                        <Text type="danger">Remove</Text>
                    </a>
                </Space>
            ),
        },
    ]

    const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false)

    const handleOpenConfirmModal = (student) => {
        setIsOpenConfirmModal(true)
        setCurrentStudent(student)
    }

    const handleCancelConfirmModal = () => {
        setIsOpenConfirmModal(false)
    }

    const handleSubmit = () => {
        handleRemoveStudent()
        setIsOpenConfirmModal(false)
    }

    const validateExistedStudent = () => {
        const student = data.students.find(i => i._id.toString() === currentAddStudent.toString())
        return student
    }

    const handleSubmitAddStudent = () => {
        if (validateExistedStudent()) {
            message.error('Student already in class list!')
            return
        } else {
            message.success('Add student success!')
        }
    }


    return (
        <>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                }}
            >
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <Input
                        placeholder="Search student..."
                        onChange={(e) => setSearchValue(e.target.value)}
                    />
                    <Button type="primary" onClick={handleSearch}>
                        Search
                    </Button>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <Select
                        style={{ width: 250 }}
                        showSearch
                        placeholder="Enter an student ID"
                        optionFilterProp="children"
                        onChange={onSelectStudent}
                        filterOption={(input, option) =>
                            option.children[0]
                                .toLowerCase()
                                .indexOf(input.toLowerCase()) >= 0
                        }
                    >
                        {listAllStudent.map((i) => (
                            <Option value={i._id} key={i._id}>
                                {i.studentId} - {i.name}
                            </Option>
                        ))}
                    </Select>
                    <Button type="primary" onClick={handleSubmitAddStudent}>Add Student</Button>
                </div>
            </div>
            <Table columns={columns} dataSource={listStudent.map(i => ({...i, key: i._id}))} />
            <Modal
                visible={isOpenConfirmModal}
                onOk={handleSubmit}
                onCancel={handleCancelConfirmModal}
                title="Confirm"
                okText="Confirm"
                cancelText="Cancel"
            >
                Remove student: {currentStudent.name}- ID:{' '}
                {currentStudent.studentId} ?
            </Modal>
        </>
    )
}
