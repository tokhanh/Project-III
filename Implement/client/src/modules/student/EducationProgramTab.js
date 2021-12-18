import { Table } from 'antd'
import React, { useState } from 'react'
import { useStudentContext } from './ProfileAndEducationProgram'

export default function EducationProgramTab() {
    const { educationProgram } = useStudentContext()
    //eslint-disable-next-line
    const [listSubject, setListSubject] = useState(
        educationProgram.subjects.map((i) => ({
            key: i.code,
            code: i.code,
            name: i.name,
            credit: i.credit,
        }))
    )
    const columns = [
        {
            title: 'Code',
            dataIndex: 'code',
            key: 'code',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Credit',
            dataIndex: 'credit',
            key: 'credit',
        },
    ]

    return (
        <div>
            <Table dataSource={listSubject} columns={columns}/>
        </div>
    )
}
