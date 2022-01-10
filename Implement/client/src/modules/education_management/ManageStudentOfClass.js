import React, { useEffect, useState } from 'react'
import { Space, Table, Typography, Input, Button, Modal, message } from 'antd'
import sendRequest from '../../helpers/requestHelpers'
import { RequestMethods } from '../../global/Constants'

const { Text } = Typography

export default function ManageStudentOfClass(props) {
    const { data } = props
    const [listStudent, setListStudent] = useState(data.students)
    const [searchValue, setSearchValue] = useState('')
    const [currentStudent, setCurrentStudent] = useState({})

    const handleSearch = () => {
        const pattern = new RegExp(searchValue, 'gi')
        setListStudent(
            data.students.filter((i) => pattern.test(i.studentId.toString()))
        )
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
                    <Input placeholder="Search student..." />
                    <Button type="primary">Add Student</Button>
                </div>
            </div>
            <Table columns={columns} dataSource={listStudent} />
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
