import { Button, Input, message, Modal, Space, Table, Typography } from 'antd'
import React, { useState } from 'react'
import { RequestMethods } from '../../../global/Constants'
import sendRequest from '../../../helpers/requestHelpers'
import { useClassContext } from './Class'

const { Text } = Typography

export default function RegisterClassTab() {
    const { listClass, student, fetchData } = useClassContext()

    const registeredClass = listClass
        .map((_class) =>
            _class.students.find((i) => i._id === student._id)
                ? { ..._class, key: _class.code }
                : undefined
        )
        .filter((i) => i)

    const registerUnitOfStudies = student.registerUnitOfStudies

    const [listRegisterClass, setListRegisterClass] = useState([
        ...registeredClass,
    ])

    const checkIsChangeRegisterClass = () => {
        return (
            JSON.stringify(listRegisterClass.sort((a, b) => a - b)) ===
            JSON.stringify(registeredClass.sort((a, b) => a - b))
        )
    }

    const [classCode, setClassCode] = useState('')

    const handleChangeCode = (e) => setClassCode(e.target.value)

    const validationClassCode = (string = '') => {
        const _string = string.toString().trim()
        //eslint-disable-next-line
        const openClass = listClass.find((i) => i.code.toString() == _string)
        if (openClass) {
            return openClass
        }
        return false
    }
    //eslint-disable-next-line
    const checkDuplicateTimeTable = () => {}

    const checkIsExistedCode = (list = [], id = '') => {
        return list.some((i) => i._id === id)
    }

    const checkSubjectCodeIsExistedInListRegisterUnit = (registerClass) => {
        return registerUnitOfStudies.find((i) => i === registerClass.subjectId)
    }

    const handleAddClass = () => {
        const registerClass = validationClassCode(classCode)
        if (!registerClass) {
            message.error('Mã lớp không tồn tại!')
            return
        }
        if (checkIsExistedCode(listRegisterClass, registerClass._id)) {
            message.error('Trùng mã lớp!')
            return
        }
        if (!checkSubjectCodeIsExistedInListRegisterUnit(registerClass)) {
            message.error(
                `Chưa đăng ký học phần "${registerClass.subjectName}"!`
            )
            return
        }
        setListRegisterClass([...listRegisterClass, registerClass])
    }

    const handleRemoveClass = (id) => {
        setListRegisterClass(listRegisterClass.filter((i) => i._id !== id))
    }
    const columns = [
        {
            title: 'Mã lớp',
            dataIndex: 'code',
            key: 'code',
        },
        {
            title: 'Lớp',
            dataIndex: 'subjectName',
            key: 'subjectName',
        },
        {
            title: 'Học kỳ',
            dataIndex: 'semester',
            key: 'semester',
        },
        {
            title: 'Thời gian',
            dataIndex: 'time',
            key: 'time',
        },
        {
            title: 'Địa điểm',
            dataIndex: 'position',
            key: 'position',
        },
        {
            title: 'Hành động',
            dataIndex: 'action',
            render: (text, record) => (
                <Space size="middle">
                    {/* eslint-disable-next-line */}
                    <a onClick={() => handleRemoveClass(record._id)}>
                        <Text type="danger">Remove</Text>
                    </a>
                </Space>
            ),
        },
    ]

    const handleSubmit = async () => {
        const response = await sendRequest({
            method: RequestMethods.POST,
            url: 'http://localhost:4001/v1/student/register-class',
            data: {
                inClass: listRegisterClass.map((i) => i._id),
                sid: student._id,
            },
        })
        if (response) {
            message.success('Đăng ký lớp thành công!')
            fetchData()
        } else {
            message.error('Đăng ký lớp thất bại!')
        }
        setIsOpenModal(false)
    }

    const [isOpenModal, setIsOpenModal] = useState(false)

    const confirm = () => {
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
                    placeholder="Nhập mã lớp"
                    onChange={handleChangeCode}
                />
                <Button type="primary" onClick={handleAddClass}>
                    Thêm
                </Button>
            </Input.Group>
            <Table columns={columns} dataSource={listRegisterClass} />
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
                    disabled={checkIsChangeRegisterClass()}
                    onClick={confirm}
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
                    Đăng ký các lớp học này?
                </Modal>
            </Space>
        </div>
    )
}
