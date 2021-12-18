import { Avatar } from 'antd'
import React from 'react'
import styled from 'styled-components'
import { useStudentContext } from './ProfileAndEducationProgram'

export default function ProfileTab() {
    const { student, institude } = useStudentContext()
    
    return (
        <StudentWrapper>
            <div style={{ marginRight: '20px' }}>
                <Avatar size={128} />
            </div>
            <div>
                <h2>Student Information</h2>
                <h3>Student name: {student.name}</h3>
                <h3>ID: {student.studentId}</h3>
                <h3>Year Of Admission: {student.yearOfAdmission}</h3>
                <h3>Status: {student.status}</h3>
                <h3>Institude: {institude.name}</h3>
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
