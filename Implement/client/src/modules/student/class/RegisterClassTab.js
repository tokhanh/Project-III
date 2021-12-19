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
            _class.students.find((i) => i === student._id)
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
            message.error('Class code not existed!')
        } else {
            checkIsExistedCode(listRegisterClass, registerClass._id)
                ? message.error('Duplicate class code!')
                : checkSubjectCodeIsExistedInListRegisterUnit(registerClass)
                ? setListRegisterClass([...listRegisterClass, registerClass])
                : message.error(
                      `Unit of Study "${registerClass.subjectName}" haven't register yet!`
                  )
        }
    }

    const handleRemoveClass = (id) => {
        setListRegisterClass(listRegisterClass.filter((i) => i._id !== id))
    }
    const columns = [
        {
            title: 'Class Code',
            dataIndex: 'code',
            key: 'code',
        },
        {
            title: 'Subject',
            dataIndex: 'subjectName',
            key: 'subjectName',
        },
        {
            title: 'Time',
            dataIndex: 'time',
            key: 'time',
        },
        {
            title: 'Position',
            dataIndex: 'position',
            key: 'position',
        },
        {
            title: 'Action',
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
            message.success('Register class success fully!!')
            fetchData()
        } else {
            message.error('Register class failed!')
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
                    placeholder="Enter a class code"
                    onChange={handleChangeCode}
                />
                <Button type="primary" onClick={handleAddClass}>
                    Add Class
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
                    Submit
                </Button>
                <Modal
                    visible={isOpenModal}
                    onOk={handleSubmit}
                    onCancel={cancelModal}
                    title="Confirm"
                    okText="Confirm"
                    cancelText="Cancel"
                >
                    Register Class ?
                </Modal>
            </Space>
        </div>
    )
}
