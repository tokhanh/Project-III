import {
    Button,
    Input,
    message,
    Modal,
    Select,
    Space,
    Table,
    Typography,
} from 'antd'
import moment from 'moment'
import React, { useState } from 'react'
import { RequestMethods } from '../../../global/Constants'
import sendRequest from '../../../helpers/requestHelpers'
import { useClassContext } from './Class'

const { Option } = Select
const { Text, Title } = Typography
const formatDate = 'DD/MM/YYYY HH:mm:ss'

export default function RegisterClassTab(props) {
    const { listSemester } = props
    const { listClass, student, fetchData } = useClassContext()
    const [listClassInSemester, setListClassInSemester] = useState([])

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
        const openClass = listClassInSemester.find((i) => i.code.toString() == _string)
        if (openClass) {
            return openClass
        }
        return false
    }
    //eslint-disable-next-line
    const checkDuplicateTimeTable = (registerClass) => {
        const listDuplicateDay = listRegisterClass.filter(i => i.defaultTime.day.toString() === registerClass.defaultTime.day.toString())
        const listDuplicate = listDuplicateDay.find(i => i.defaultTime.shift.toString() === registerClass.defaultTime.shift.toString())
        if (listDuplicate) {
            return listDuplicate
        }
        return false
    }

    const checkIsExistedCode = (list = [], id = '') => {
        return list.some((i) => i._id === id)
    }

    const checkSubjectCodeIsExistedInListRegisterUnit = (registerClass) => {
        return registerUnitOfStudies.find((i) => i === registerClass.subjectId)
    }

    const validatePriotyTime = () => {
        let _csemester = listSemester.find(
            (i) => i?.semester?.toString() === currentSemester?.toString()
        )
        let timePrioty = _csemester?.registerPriotyClassTime
        if (timePrioty) {
            let startTime = moment(
                formatDateFunc(timePrioty?.startTime),
                formatDate
            )
            let endTime = moment(
                formatDateFunc(timePrioty?.endTime),
                formatDate
            )
            let now = moment(formatDateFunc(new Date()), formatDate)
            if (!startTime.isValid() || !endTime.isValid()) {
                return false
            } else {
                if (startTime.isBefore(now) && endTime.isAfter(now)) {
                    return true
                }
                return false
            }
        } else {
            return false
        }
    }

    const handleAddClass = () => {
        const registerClass = validationClassCode(classCode)

        if (!registerClass) {
            message.error('Mã lớp không tồn tại!')
            return
        }
        const duplicateClass = checkDuplicateTimeTable(registerClass)
        if (duplicateClass) {
            message.error(`Trùng thời khóa biểu ${duplicateClass.code} - ${duplicateClass.subjectName}`)
            return
        }
        if (checkIsExistedCode(listRegisterClass, registerClass._id)) {
            message.error('Trùng mã lớp!')
            return
        }
        if (validatePriotyTime()) {
            if (!checkSubjectCodeIsExistedInListRegisterUnit(registerClass)) {
                message.error(
                    `Chưa đăng ký học phần "${registerClass.subjectName}"!`
                )
                return
            }
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
                    <a
                        onClick={() =>
                            !validateTimeToRegisterClass()
                                ? {}
                                : handleRemoveClass(record._id)
                        }
                    >
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
    const [currentSemester, setCurrentSemester] = useState(null)
    const onChangeSemester = (value) => {
        setCurrentSemester(value)
        setListClassInSemester(
            listClass.filter((i) => i.semester.toString() === value.toString())
        )
    }

    const formatDateFunc = (date) => {
        const _date = new Date(date)
        const day = _date.getDate()
        const month = _date.getMonth() + 1
        const year = _date.getFullYear()
        const hour = _date.getHours()
        const minutes = _date.getMinutes()
        const seconds = _date.getSeconds()
        return `${day}/${month}/${year} ${hour}:${minutes}:${seconds}`
    }
    const validateTimeToRegisterClass = () => {
        let _csemester = listSemester.find(
            (i) => i?.semester?.toString() === currentSemester?.toString()
        )
        let timePrioty = _csemester?.registerPriotyClassTime
        let timeAdjusted = _csemester?.registerAdjustedClassTime
        if (timePrioty && timeAdjusted) {
            let startTime = moment(
                formatDateFunc(timePrioty?.startTime),
                formatDate
            )
            let endTime = moment(
                formatDateFunc(timeAdjusted?.endTime),
                formatDate
            )
            let now = moment(formatDateFunc(new Date()), formatDate)
            if (!startTime.isValid() || !endTime.isValid()) {
                return false
            } else {
                if (startTime.isBefore(now) && endTime.isAfter(now)) {
                    return true
                }
                return false
            }
        } else {
            return false
        }
    }

    return (
        <div>
            <div style={{ marginBottom: '20px' }}>
                <Title level={5}>Chọn kỳ học</Title>
                <Select style={{ width: 150 }} onChange={onChangeSemester}>
                    {listSemester.map((i) => (
                        <Option key={i._id} value={i.semester}>
                            {i.semester}
                        </Option>
                    ))}
                </Select>
                <Text type="danger" style={{ marginLeft: '20px' }}>
                    {!validateTimeToRegisterClass()
                        ? !currentSemester
                            ? ''
                            : `Không phải thời điểm đăng ký lớp kỳ ${currentSemester}`
                        : ''}
                </Text>
            </div>
            <Input.Group compact>
                <Input
                    style={{ width: '200px' }}
                    placeholder="Nhập mã lớp"
                    onChange={handleChangeCode}
                />
                <Button
                    type="primary"
                    onClick={handleAddClass}
                    disabled={!validateTimeToRegisterClass()}
                >
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
