import { Table, Typography } from 'antd'
import React, { useState } from 'react'
import { useStudentContext } from './ProfileAndEducationProgram'

const { Title } = Typography

export default function EducationProgramTab() {
    const { educationProgram } = useStudentContext()
    //eslint-disable-next-line
    const [listSubject, setListSubject] = useState(
        educationProgram.subjects.map((i) => ({
            key: i.code,
            code: i.code,
            name: i.name,
            credit: i.credit,
            institudeCode: i.institude.institudeCode,
        }))
    )
    const columns = [
        {
            title: 'Mã học phần',
            dataIndex: 'code',
            key: 'code',
        },
        {
            title: 'Tên học phần',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Tín chỉ',
            dataIndex: 'credit',
            key: 'credit',
        },
        {
            title: 'Viện đào tạo',
            dataIndex: 'institudeCode',
            key: 'institudeCode',
        },
    ]

    return (
        <div>
            <Title level={5}>
                Thông tin chương trình đào tạo {educationProgram.code}
            </Title>
            <Table dataSource={listSubject} columns={columns} />
        </div>
    )
}
