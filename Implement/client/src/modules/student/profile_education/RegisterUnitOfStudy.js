import { Button, Input, message, Space, Table, Typography } from 'antd'
import Modal from 'antd/lib/modal/Modal'
import React, { useState } from 'react'
import { RequestMethods } from '../../../global/Constants'
import { useGlobalContext } from '../../../global/GlobalContext'
import sendRequest from '../../../helpers/requestHelpers'
import { useStudentContext } from './ProfileAndEducationProgram'

const { Text } = Typography

export default function RegisterUnitOfStudyTab() {
    const { user } = useGlobalContext()
    const {
        educationProgram,
        student,
        registerUnitOfStudies,
        setStudentInformation,
    } = useStudentContext()

    const [listRegister, setListRegister] = useState([
        ...educationProgram.subjects
            .map((subject) => {
                if (registerUnitOfStudies.some((i) => i === subject._id)) {
                    return subject
                }
                return undefined
            })
            .filter((i) => i),
    ])

    const [code, setCode] = useState('')
    const [isOpenModal, setIsOpenModal] = useState(false)

    const handleChangeCode = (e) => setCode(e.target.value)

    const sortCodeStringArray = (arr = []) => {
        const newArray = arr
            .map((i) => i._id)
            .sort((a, b) => a.toString().localeCompare(b.toString()))
        return newArray
    }

    const checkChangeListRegisterSubject = () => {
        return (
            JSON.stringify(sortCodeStringArray(listRegister)) ===
            JSON.stringify(registerUnitOfStudies)
        )
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
            message.error('Mã học phần không tồn tại!')
            return
        }
        if (checkIsExistedCode(listRegister, subject._id)) {
            message.error('Trùng mã học phần!')
            return
        }
        if (!checkLimitedCredit(listRegister, subject)) {
            message.error('Giới hạn tín chỉ tối đa !!')
            return
        }
        setListRegister([...listRegister, subject])
    }

    const handleRemoveSubject = (id) => {
        setListRegister(listRegister.filter((i) => i._id !== id))
    }

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
            title: 'Hành động',
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

    const handleSubmit = async () => {
        const response = await sendRequest({
            method: RequestMethods.POST,
            url: 'http://localhost:4001/v1/student/register-unit-of-study',
            data: {
                uid: user,
                sid: student._id,
                registerUnitOfStudies: listRegister.map((i) => i._id),
            },
        })
        if (response) {
            setStudentInformation({
                institude: response.data.content[0]?.institude[0],
                student: response.data.content[0]?.student[0],
                educationProgram: {
                    code: response.data.content[0].educationProgram[0]?.code,
                    name: response.data.content[0].student[0]?.name,
                    subjects: response.data.content[0]?.subjects,
                },
                registerUnitOfStudies:
                    response.data.content[0]?.student[0]?.registerUnitOfStudies,
            })
            message.success('Đăng ký học phần thành công!')
        } else {
            message.error('Đăng ký học phần thất bại!')
        }
        setIsOpenModal(false)
    }

    const confirmModal = () => {
        setIsOpenModal(true)
    }
    const cancelModal = () => {
        setIsOpenModal(false)
    }

    return (
        <div>
            <Input.Group compact>
                <Input
                    style={{ width: '200px' }}
                    placeholder="Nhập mã học phần"
                    onChange={handleChangeCode}
                />
                <Button type="primary" onClick={handleAddUnitOfStudy}>
                    Thêm
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
                <Button
                    type="primary"
                    disabled={checkChangeListRegisterSubject()}
                    onClick={confirmModal}
                >
                    Đăng ký
                </Button>
                <Modal
                    visible={isOpenModal}
                    onOk={handleSubmit}
                    onCancel={cancelModal}
                    title="Xác nhận"
                    okText="Đồng ý"
                    cancelText="Hủy bỏ"
                >
                    Xác nhận đăng ký học phần ?
                </Modal>
            </Space>
        </div>
    )
}
