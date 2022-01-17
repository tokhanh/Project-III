import { Avatar } from 'antd'
import React from 'react'
import styled from 'styled-components'
import { useStudentContext } from './ProfileAndEducationProgram'

export default function ProfileTab() {
    const { student, institude } = useStudentContext()
    const statusDisplay = (value) => {
        switch (value) {
            case 0:
                return 'Thôi học'
            case 1:
                return 'Đang học tập'
            case 2:
                return 'Đang bảo lưu'
            default:
                break
        }
    }

    return (
        <StudentWrapper>
            <div style={{ marginRight: '20px' }}>
                <Avatar size={128} />
            </div>
            <div>
                <h2>Thông tin sinh viên</h2>
                <h3>Họ và tên: {student.name}</h3>
                <h3>ID: {student.studentId}</h3>
                <h3>Năm nhập học: {student.yearOfAdmission}</h3>
                <h3>Trạng thái học tập: {statusDisplay(student.status)}</h3>
                <h3>Khoa / viện đào tạo: {institude.name}</h3>
            </div>
        </StudentWrapper>
    )
}

const StudentWrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-start;
    div {
        margin: 40px;
    }
`
