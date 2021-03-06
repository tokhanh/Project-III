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
    const { listClass, student, fetchData, studentFullInfo } = useClassContext()

    const [listClassInSemester, setListClassInSemester] = useState([])
    const [currentSemester, setCurrentSemester] = useState(null)
    const [listRegisteredInSemester, setListRegisteredInSemester] = useState([])
    const [newListRegisteredClassInSemester, setNewRegisteredClassInSemester] =
        useState([])
    const [listRegisterUnitOfStudy, setListRegisterUnitOfStudy] = useState([])
    const fetchListUnitOfStudy = async (data = {}) => {
        const response = await sendRequest({
            method: RequestMethods.GET,
            url: 'http://localhost:4001/v1/student/list-register-unit-of-study',
            data: data,
        })
        if (response) {
            const receiveData = response.data.content
            setListRegisterUnitOfStudy(receiveData)
        } else {
            message.error('Lấy danh sách đăng ký học phần thất bại!')
        }
    }

    const onChangeSemester = (value) => {
        setCurrentSemester(value)
        const _listClassInSemeter = listClass.filter(
            (i) => i.semester.toString() === value.toString()
        )

        setListClassInSemester(_listClassInSemeter)
        setListRegisteredInSemester(
            _listClassInSemeter
                .map((_class) =>
                    _class.students.find((i) => i._id === student._id)
                        ? { ..._class, key: _class.code }
                        : undefined
                )
                .filter((i) => i)
        )
        setNewRegisteredClassInSemester(
            _listClassInSemeter
                .map((_class) =>
                    _class.students.find((i) => i._id === student._id)
                        ? { ..._class, key: _class.code }
                        : undefined
                )
                .filter((i) => i)
        )
        fetchListUnitOfStudy({
            studentId: student.studentId,
            semester: currentSemester,
        })
    }

    const checkIsChangeRegisterClass = () => {
        return (
            JSON.stringify(listRegisteredInSemester.sort((a, b) => a - b)) ===
            JSON.stringify(
                newListRegisteredClassInSemester.sort((a, b) => a - b)
            )
        )
    }

    const [classCode, setClassCode] = useState('')
    const handleChangeCode = (e) => setClassCode(e.target.value)

    const checkStudentIsOnTheRegisterList = () => {
        return studentFullInfo.student[0].status === 1
    }

    const checkLimitedCredit = (list = [], subject, limitCredit = 12) => {
        let count = 0
        list.forEach((i) => (count = count + Number(i.credit)))
        return count + Number(subject.credit) <= limitCredit
    }
    const checkLimitedNumberRegister = (a = 0, b = 0) => {
        return a < b
    }

    const validationClassCode = (string = '') => {
        const _string = string.toString().trim()
        //eslint-disable-next-line
        const openClass = listClassInSemester.find(
            (i) => i.code.toString() === _string.toString()
        )
        if (openClass) {
            return openClass
        }
        return false
    }
    //eslint-disable-next-line
    const checkDuplicateTimeTable = (registerClass) => {
        const listDuplicateDay = newListRegisteredClassInSemester.filter(
            (i) =>
                i.defaultTime.day.toString() ===
                registerClass.defaultTime.day.toString()
        )
        const listDuplicate = listDuplicateDay.find(
            (i) =>
                i.defaultTime.shift.toString() ===
                registerClass.defaultTime.shift.toString()
        )
        if (listDuplicate) {
            return listDuplicate
        }
        return false
    }

    const checkIsExistedCode = (list = [], id = '') => {
        return list.some((i) => i._id === id)
    }

    const checkSubjectCodeIsExistedInListRegisterUnit = (registerClass) => {
        return listRegisterUnitOfStudy.find(
            (i) =>
                i.subject._id.toString() === registerClass.subjectId.toString()
        )
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

    const validateAdjustedTime = () => {
        let _csemester = listSemester.find(
            (i) => i?.semester?.toString() === currentSemester?.toString()
        )
        let timeAdjusted = _csemester?.registerAdjustedClassTime
        if (timeAdjusted) {
            let startTime = moment(
                formatDateFunc(timeAdjusted?.startTime),
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

    const handleAddClass = () => {
        const registerClass = validationClassCode(classCode)
        if (!registerClass) {
            message.error('Mã lớp không tồn tại!')
            return
        }
        if (
            checkIsExistedCode(
                newListRegisteredClassInSemester,
                registerClass._id
            )
        ) {
            message.error('Trùng mã lớp!')
            return
        }
        const duplicateClass = checkDuplicateTimeTable(registerClass)
        if (duplicateClass) {
            message.error(
                `Trùng thời khóa biểu ${duplicateClass.code} - ${duplicateClass.subjectName}`
            )
            return
        }
        if (
            !checkLimitedNumberRegister(
                registerClass.numberRegisteredStudent,
                registerClass.maximum
            )
        ) {
            message.error('Lớp đã đầy!')
            return
        }
        if (
            !checkLimitedCredit(
                newListRegisteredClassInSemester,
                registerClass,
                Number(studentFullInfo.educationProgram[0].maxLimitOfCredit)
            )
        ) {
            message.error('Giới hạn tín chỉ tối đa !')
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
        setNewRegisteredClassInSemester([
            ...newListRegisteredClassInSemester,
            registerClass,
        ])
    }

    const handleRemoveClass = (id) => {
        setNewRegisteredClassInSemester(
            newListRegisteredClassInSemester.filter((i) => i._id !== id)
        )
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
            title: 'Mã môn học',
            dataIndex: 'subjectCode',
            key: 'subjectCode',
        },
        {
            title: 'Tín chỉ',
            dataIndex: 'credit',
            key: 'credit',
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
                            !validateTimeToRegisterClass() ||
                            !checkStudentIsOnTheRegisterList()
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
                inClass: newListRegisteredClassInSemester.map((i) => i._id),
                sid: student._id,
                semester: currentSemester,
            },
        })
        if (response) {
            message.success('Đăng ký lớp thành công!')
            setListRegisteredInSemester(newListRegisteredClassInSemester)
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
        return validatePriotyTime() || validateAdjustedTime()
    }
    const countCredit = (list = []) => {
        let count = 0
        list.forEach((i) => (count = Number(i?.credit) + count))
        return count
    }

    return (
        <div>
            <div style={{ margin: '0 10px' }}>
                <Title level={5}>Chọn kỳ học</Title>
                <Select style={{ width: 150 }} onChange={onChangeSemester}>
                    {listSemester.map((i) => (
                        <Option key={i._id} value={i.semester}>
                            {i.semester}
                        </Option>
                    ))}
                </Select>
                <Text type="danger" style={{ marginLeft: '20px' }}>
                    {!checkStudentIsOnTheRegisterList()
                        ? 'Bạn không có trong danh sách đăng ký!'
                        : !validateTimeToRegisterClass()
                        ? !currentSemester
                            ? ''
                            : `Không phải thời điểm đăng ký lớp kỳ ${currentSemester}`
                        : ''}
                </Text>
            </div>
            <div style={{ margin: '10px 10px' }}>
                <Input.Group compact>
                    <Input
                        style={{ width: '200px' }}
                        placeholder="Nhập mã lớp"
                        onChange={handleChangeCode}
                    />
                    <Button
                        type="primary"
                        onClick={handleAddClass}
                        disabled={
                            !validateTimeToRegisterClass() ||
                            !checkStudentIsOnTheRegisterList()
                        }
                    >
                        Thêm
                    </Button>
                </Input.Group>
                {currentSemester && (
                    <Text type="secondary">
                        Số lượng tín chỉ đăng ký:{' '}
                        {countCredit(newListRegisteredClassInSemester)}
                    </Text>
                )}
            </div>
            <div style={{ margin: '0 10px' }}>
                <Table
                    columns={columns}
                    dataSource={newListRegisteredClassInSemester}
                />
            </div>
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
                    disabled={
                        checkIsChangeRegisterClass() ||
                        !checkStudentIsOnTheRegisterList()
                    }
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
