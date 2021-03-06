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
            message.error('L???y danh s??ch sinh vi??n th???t b???i!')
        }
    }

    const columns = [
        {
            title: 'M?? s??? sinh vi??n',
            dataIndex: 'studentId',
            key: 'studentId',
        },
        {
            title: 'H??? v?? t??n',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'N??m nh???p h???c',
            dataIndex: 'yearOfAdmission',
            key: 'yearOfAdmission',
        },
        {
            title: 'Tr???ng th??i h???c t???p',
            dataIndex: 'statusName',
            key: 'statusName',
        },
        {
            title: 'Vi???n ????o t???o',
            dataIndex: 'institudeCode',
            key: 'institudeCode',
        },
        {
            title: 'Ch????ng tr??nh ????o t???o',
            dataIndex: 'educationProgramCode',
            key: 'educationProgramCode',
        },
        {
            title: 'H??nh ?????ng',
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
                return 'Th??i h???c'
            case 1:
                return '??ang h???c t???p'
            case 2:
                return '??ang b???o l??u'
            case 3:
                return '???? t???t nghi???p'
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
                Qu???n l?? sinh vi??n
            </Title>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button type="primary">Th??m sinh vi??n</Button>
            </div>
            <div style={{ display: 'flex' }}>
                <SearchBoxWrapper>
                    <Input
                        width={150}
                        placeholder="Nh???p m?? s??? sinh vi??n"
                        onChange={handleChangeStudentId}
                    />
                    <Select
                        style={{ width: 300 }}
                        placeholder="Tr???ng th??i h???c t???p"
                        defaultValue={null}
                        onChange={handleChangeStatus}
                    >
                        <Option value={0}>Th??i h???c</Option>
                        <Option value={1}>??ang h???c t???p</Option>
                        <Option value={2}>??ang b???o l??u</Option>
                        <Option value={3}>???? t???t nghi???p</Option>
                    </Select>
                    <Select
                        style={{ width: 300 }}
                        placeholder="Vi???n ????o t???o"
                    ></Select>
                    <div className="btn-search">
                        <Button type="primary" onClick={handleSearch} disabled={!validateSearchInput()}>T??m ki???m</Button>
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
