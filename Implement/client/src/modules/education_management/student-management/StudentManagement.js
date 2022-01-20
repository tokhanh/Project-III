import { Button, Input, message, Modal, Select, Space, Table } from 'antd'
import Text from 'antd/lib/typography/Text'
import Title from 'antd/lib/typography/Title'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { RequestMethods } from '../../../global/Constants'
import sendRequest from '../../../helpers/requestHelpers'
import StudentEditForm from './StudentEditForm'

const { Option } = Select

export default function StudentManagement() {
    const [listAllStudent, setListAllStudent] = useState([])
    const [listFilterStudent, setListFilterStudent] = useState([])
    const [searchData, setSearchData] = useState({
        studentId: '',
        status: '',
    })

    const handleChangeStudentId = (e) => {
        setSearchData({
            ...searchData,
            studentId: e.target.value,
        })
    }

    const handleChangeStatus = (value) => {
        setSearchData({
            ...searchData,
            status: value,
        })
    }

    const validateSearchInput = () => {
        return searchData.studentId === '' || searchData.status === ''
    }

    const handleSearch = () => {
        const { studentId, status } = searchData
        let list = []
        if (studentId) {
            let keyCode = new RegExp(`${studentId}`, 'gi')
            list = listAllStudent.filter((i) =>
                i.studentId.toString().match(keyCode)
            )
        } else {
            list = [...listAllStudent]
        }
        if (status) {
            studentId ? list = list.filter(i => i.status === status) : list = listAllStudent.filter(i => i.status === status)
        }
        setListFilterStudent(list)
        setSearchData({
            ...searchData,
            status: ''
        })
    }

    const fetchStudentData = async (data = {}) => {
        const response = await sendRequest({
            url: 'http://localhost:4001/v1/training-department/list-student',
            method: RequestMethods.GET,
            data: data,
        })
        if (response) {
            setListAllStudent(response.data.content)
            setListFilterStudent(response.data.content)
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
        <StudentManagementContainer>
            <Title level={4} style={{ margin: '0 20px 20px 0' }}>
                Quản lý sinh viên
            </Title>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button type="primary">Thêm sinh viên</Button>
            </div>
            <div style={{ display: 'flex' }}>
                <SearchBoxWrapper>
                    <Input
                        width={150}
                        placeholder="Nhập mã số sinh viên"
                        onChange={handleChangeStudentId}
                    />
                    <Select
                        style={{ width: 300 }}
                        placeholder="Trạng thái học tập"
                        defaultValue={null}
                        onChange={handleChangeStatus}
                    >
                        <Option value={0}>Thôi học</Option>
                        <Option value={1}>Đang học tập</Option>
                        <Option value={2}>Đang bảo lưu</Option>
                        <Option value={3}>Đã tốt nghiệp</Option>
                    </Select>
                    <Select
                        style={{ width: 300 }}
                        placeholder="Viện đào tạo"
                    ></Select>
                    <div className="btn-search">
                        <Button type="primary" onClick={handleSearch} disabled={!validateSearchInput()}>Tìm kiếm</Button>
                    </div>
                </SearchBoxWrapper>
            </div>
            <Table
                columns={columns}
                dataSource={dataDisplay(listFilterStudent)}
            />
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
        </StudentManagementContainer>
    )
}

const StudentManagementContainer = styled.div`
    margin: 10px 20px 0 20px;
`
const SearchBoxWrapper = styled.div`
    display: flex;
    .ant-input {
        margin: 10px 10px 10px 0;
    }
    .ant-select {
        margin: 10px 10px 10px 10px;
    }
    .btn-search {
        margin: 10px 10px 10px 10px !important;
    }
`
