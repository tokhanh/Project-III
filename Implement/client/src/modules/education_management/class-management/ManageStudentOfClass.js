import React, { useEffect, useState } from 'react'
import { Space, Table, Typography, Button, Modal, message, Select } from 'antd'

const { Text } = Typography
const { Option } = Select

export default function ManageStudentOfClass(props) {
    const { data, listAllStudent, updateClassService } = props
    const [listStudent, setListStudent] = useState(data.students)

    const [currentStudent, setCurrentStudent] = useState({})
    const [currentAddStudent, setCurrentAddStudent] = useState('')

    const onSelectStudent = (value) => {
        setCurrentAddStudent(value)
    }

    useEffect(() => {
        setListStudent(data.students)
        /* eslint-disable-next-line */
    }, [JSON.stringify(data)])

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

    const handleRemoveStudent = async () => {
        const _listStudent = listStudent.filter(
            (i) =>
                i.studentId.toString() !== currentStudent.studentId.toString()
        )
        const _updateClassData = {
            ...data,
            students: _listStudent,
        }
        updateClassService(_updateClassData)
        setListStudent(_listStudent)
    }

    const validateExistedStudent = () => {
        const student = listStudent.find(
            (i) => i._id.toString() === currentAddStudent.toString()
        )
        return student
    }

    const handleSubmitAddStudent = () => {
        if (validateExistedStudent()) {
            message.error('Student already in class list!')
            return
        } else {
            let newStudent = listAllStudent.find(
                (i) => i._id.toString() === currentAddStudent.toString()
            )
            const newListStudent = [...listStudent, newStudent]
            setListStudent(newListStudent)
            let _updateClassData = {
                ...data,
                students: newListStudent,
            }
            updateClassService(_updateClassData)
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
                {/* <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <Input
                        placeholder="Nhập mã số sinh viên..."
                        onChange={(e) => setSearchValue(e.target.value)}
                    />
                    <Button type="primary" onClick={handleSearch}>
                        Tìm kiếm
                    </Button>
                </div> */}
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
                    <Button type="primary" onClick={handleSubmitAddStudent} disabled={!currentAddStudent}>
                        Thêm
                    </Button>
                </div>
            </div>
            <Table
                columns={columns}
                dataSource={listStudent.map((i) => ({ ...i, key: i._id }))}
            />
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
