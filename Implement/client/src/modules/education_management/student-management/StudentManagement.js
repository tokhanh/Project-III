import { Button, message, Modal, Space, Table } from 'antd'
import Text from 'antd/lib/typography/Text'
import Title from 'antd/lib/typography/Title'
import React, { useEffect, useState } from 'react'
import { RequestMethods } from '../../../global/Constants'
import sendRequest from '../../../helpers/requestHelpers'
import StudentEditForm from './StudentEditForm'

export default function StudentManagement() {
    const [listAllStudent, setListAllStudent] = useState([])

    const fetchStudentData = async (data = {}) => {
        const response = await sendRequest({
            url: 'http://localhost:4001/v1/training-department/list-student',
            method: RequestMethods.GET,
            data: data,
        })
        if (response) {
            setListAllStudent(response.data.content)
        } else {
            message.error('Lấy danh sách sinh viên thất bại!')
        }
    }

    const columns = [
        {
            title: 'Mã số sinh viên',
            dataIndex: 'studentId',
            key: 'studentId',
        },
        {
            title: 'Họ và tên',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Năm nhập học',
            dataIndex: 'yearOfAdmission',
            key: 'yearOfAdmission',
        },
        {
            title: 'Trạng thái học tập',
            dataIndex: 'statusName',
            key: 'statusName',
        },
        {
            title: 'Viện đào tạo',
            dataIndex: 'institudeCode',
            key: 'institudeCode',
        },
        {
            title: 'Chương trình đào tạo',
            dataIndex: 'educationProgramCode',
            key: 'educationProgramCode',
        },
        {
            title: 'Hành động',
            dataIndex: 'action',
            render: (text, record) => (
                <Space size="middle">
                    {/* eslint-disable-next-line */}
                    <a onClick={() => handleOpenEditModal(record)}>
                        <Text type="warning">
                            <i className="fas fa-edit"></i>
                        </Text>
                    </a>
                    {/* eslint-disable-next-line */}
                    <a onClick={() => console.log(record)}>
                        <Text type="danger">
                            <i className="fas fa-trash"></i>
                        </Text>
                    </a>
                </Space>
            ),
        },
    ]

    const convertTypeOfStatus = (value) => {
        switch (value) {
            case 0:
                return 'Thôi học'
            case 1:
                return 'Đang học tập'
            case 2:
                return 'Đang bảo lưu'
            case 3:
                return 'Đã tốt nghiệp'
            default:
                return ''
        }
    }

    const dataDisplay = (list = []) => {
        return list.map((i) => ({
            key: i._id,
            name: i.name,
            studentId: i.studentId,
            statusName: convertTypeOfStatus(i.status),
            status: i.status,
            institude: i.institude,
            institudeCode: i.institude.institudeCode,
            yearOfAdmission: i.yearOfAdmission,
            educationProgramCode: i.educationProgram.code,
            educationProgram: i.educationProgram,
        }))
    }
    useEffect(() => {
        return fetchStudentData()
    }, [])

    const [isOpenEditModal, setIsOpenEditModal] = useState(false)
    const [currentStudentData, setCurrentStudentData] = useState({})
    const handleOpenEditModal = (record) => {
        setIsOpenEditModal(true)
        setCurrentStudentData(record)
    }
    const handleCancelEditModal = () => setIsOpenEditModal(false)

    return (
        <React.Fragment>
            <Title level={4} style={{ margin: '0 20px 20px 20px' }}>
                Quản lý sinh viên
            </Title>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button type="primary">Thêm sinh viên</Button>
            </div>
            <Table columns={columns} dataSource={dataDisplay(listAllStudent)} />
            <Modal
                onCancel={handleCancelEditModal}
                visible={isOpenEditModal}
                footer={null}
                width={1000}
            >
                <StudentEditForm
                    currentStudentData={currentStudentData}
                    handleCancelEditModal={handleCancelEditModal}
                    refreshData={fetchStudentData}
                />
            </Modal>
        </React.Fragment>
    )
}
