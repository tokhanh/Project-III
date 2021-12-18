import { Button, Input, message, Space, Table, Typography } from 'antd'
import React, { useState } from 'react'
import { useStudentContext } from './ProfileAndEducationProgram'

const { Text } = Typography

export default function RegisterUnitOfStudyTab() {
    const { educationProgram, student } = useStudentContext()

    const [listRegister, setListRegister] = useState([
        ...student.registerUnitOfStudies,
    ])

    const [code, setCode] = useState('')

    const handleChangeCode = (e) => setCode(e.target.value)

    const sortCodeStringArray = (arr=[]) => {
        const newArray = arr.map((i) => i.code)
        .sort((a, b) => a.toString().localeCompare(b.toString()))
        return newArray
    }

    const checkChangeListRegisterSubject = () => {
        return JSON.stringify(sortCodeStringArray(listRegister)) === JSON.stringify(sortCodeStringArray(student.registerUnitOfStudies))
    }

    const validationCode = (string = '') => {
        const _string = string.toString().trim()
        const subject = educationProgram.subjects.find(
            (i) => i.code === _string
        )
        if (subject) {
            return subject
        }
        return false
    }

    const checkIsExistedCode = (list = [], id = '') => {
        return list.some((i) => i._id === id)
    }

    const checkLimitedCredit = (list = [], subject, limitCredit = 12) => {
        let count = 0
        list.forEach((i) => (count = count + Number(i.credit)))
        return count + Number(subject.credit) <= limitCredit
    }

    const handleAddUnitOfStudy = () => {
        const subject = validationCode(code)
        if (!subject) {
            message.error('Subject code is not existed!')
        } else {
            checkIsExistedCode(listRegister, subject._id)
                ? message.error('Subject code duplicate!')
                : !checkLimitedCredit(listRegister, subject)
                ? message.error('Limited credit !')
                : setListRegister([...listRegister, subject])
        }
    }

    const handleRemoveSubject = (id) => {
        setListRegister(listRegister.filter((i) => i._id !== id))
    }

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
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    {/* eslint-disable-next-line */}
                    <a onClick={() => handleRemoveSubject(record._id)}>
                        <Text type="danger">Remove</Text>
                    </a>
                </Space>
            ),
        },
    ]

    return (
        <div>
            <Input.Group compact>
                <Input
                    style={{ width: '200px' }}
                    placeholder="Enter a subject code"
                    onChange={handleChangeCode}
                />
                <Button type="primary" onClick={handleAddUnitOfStudy}>
                    Register
                </Button>
            </Input.Group>
            <Table
                columns={columns}
                dataSource={listRegister.map((i) => ({ ...i, key: i._id }))}
            />
            <Space
                style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    marginBottom: '30px',
                }}
            >
                <Button type="primary" disabled={checkChangeListRegisterSubject()}>
                    Submit
                </Button>
            </Space>
        </div>
    )
}
