import { Button, Input, message, Modal, Select } from 'antd'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { RequestMethods } from '../../../global/Constants'
import sendRequest from '../../../helpers/requestHelpers'

const { Option } = Select

export default function StudentEditForm(props) {
    const { currentStudentData, handleCancelEditModal, refreshData } = props
    const [studentData, setStudentData] = useState({
        name: currentStudentData.name,
        studentId: currentStudentData.studentId,
        yearOfAdmission: currentStudentData.yearOfAdmission,
        institude: currentStudentData.institude,
        educationProgram: currentStudentData.educationProgram,
        status: currentStudentData.status,
    })

    useEffect(() => {
        setStudentData({
            _id: currentStudentData.key,
            name: currentStudentData.name,
            studentId: currentStudentData.studentId,
            yearOfAdmission: currentStudentData.yearOfAdmission,
            institude: currentStudentData.institude,
            educationProgram: currentStudentData.educationProgram,
            status: currentStudentData.status,
        })
    }, [currentStudentData])

    const onChangeStatus = (value) => {
        setStudentData({
            ...studentData,
            status: value,
        })
    }

    const handleSubmit = async (data = {}) => {
        const response = await sendRequest({
            url: 'http://localhost:4001/v1/training-department/update-one-student',
            method: RequestMethods.PUT,
            data: data,
        })
        if (response) {
            handleCancelConfirmModal()
            handleCancelEditModal()
            refreshData()
            message.success('Cập nhật thông tin thành công!')
        } else {
            message.error('Cập nhật thông tin thất bại!')
        }
    }

    const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false)
    const handleOpenConfirmModal = (_) => setIsOpenConfirmModal(true)
    const handleCancelConfirmModal = (_) => setIsOpenConfirmModal(false)

    return (
        <React.Fragment>
            <InputWrapper>
                <Label>Họ và tên</Label>
                <Input value={studentData.name} disabled={true} />
            </InputWrapper>
            <InputWrapper>
                <Label>Mã số sinh viên</Label>
                <Input value={studentData.studentId} disabled={true} />
            </InputWrapper>
            <InputWrapper>
                <Label>Năm nhập học</Label>
                <Input value={studentData.yearOfAdmission} disabled={true} />
            </InputWrapper>
            <InputWrapper>
                <Label>Khoa / viện đào tạo</Label>
                <Input value={studentData.institude.name} disabled={true} />
            </InputWrapper>
            <InputWrapper>
                <Label>Chương trình đào tạo</Label>
                <Input
                    value={studentData.educationProgram.code}
                    disabled={true}
                />
            </InputWrapper>
            <InputWrapper>
                <Label>Trạng thái học tập</Label>
                <Select
                    style={{ width: 150 }}
                    onChange={onChangeStatus}
                    value={Number(studentData.status)}
                >
                    <Option value={0}>Thôi học</Option>
                    <Option value={1}>Đang học tập</Option>
                    <Option value={2}>Đang bảo lưu</Option>
                    <Option value={3}>Đã tốt nghiệp</Option>
                </Select>
            </InputWrapper>
            <ButtonWrapper>
                <Button onClick={handleCancelEditModal}>Hủy bỏ</Button>
                <Button type="primary" onClick={handleOpenConfirmModal}>
                    Cập nhật
                </Button>
            </ButtonWrapper>
            <Modal
                title="Xác nhận"
                onCancel={handleCancelConfirmModal}
                okText="Đồng ý"
                cancelText="Hủy bỏ"
                visible={isOpenConfirmModal}
                onOk={() => handleSubmit(studentData)}
            >
                Cập nhật thông tin sinh viên ?
            </Modal>
        </React.Fragment>
    )
}

const Label = styled.label`
    width: 150px;
`
const InputWrapper = styled.div`
    display: flex;
    align-items: center;
    margin: 10px;
    :first-child {
        margin-top: 20px;
    }
`
const ButtonWrapper = styled.div`
    display: flex;
    justify-content: flex-end;
    .ant-btn {
        margin: 5px;
    }
`
