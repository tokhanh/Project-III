import { Button, Input, message, Space, Table, Typography, Select } from 'antd'
import Modal from 'antd/lib/modal/Modal'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { RequestMethods } from '../../../global/Constants'
import { useGlobalContext } from '../../../global/GlobalContext'
import sendRequest from '../../../helpers/requestHelpers'
import { useStudentContext } from './ProfileAndEducationProgram'

const { Text, Title } = Typography
const { Option } = Select

const formatDate = 'DD/MM/YYYY HH:mm:ss'

export default function RegisterUnitOfStudyTab() {
    const { listSemester } = useGlobalContext()
    const { educationProgram, student, studentInfomation } = useStudentContext()

    const [listRegister, setListRegister] = useState([])
    const [listRegisterInSemester, setListRegisterInSemester] = useState([])

    const [currentSemester, setCurrentSemester] = useState(null)
    const onChangeSemester = (value) => {
        setListRegisterInSemester(
            listRegister
                .filter((i) => i.semester.toString() === value.toString())
                .map((i) => ({
                    key: i.subject._id,
                    _id: i.subject._id,
                    code: i.subject.code,
                    name: i.subject.name,
                    credit: i.subject.credit,
                    institude: i.subject.institude,
                }))
        )
        setCurrentSemester(value)
    }

    const fetchListUnitOfStudy = async (data = {}) => {
        const response = await sendRequest({
            method: RequestMethods.GET,
            url: 'http://localhost:4001/v1/student/list-register-unit-of-study',
            data: data,
        })
        if (response) {
            const receiveData = response.data.content
            setListRegister(receiveData)
        } else {
            message.error('Lấy danh sách đăng ký học phần thất bại!')
        }
    }
    useEffect(() => {
        return fetchListUnitOfStudy({
            studentId: student.studentId,
            semester: currentSemester
        })
        /* eslint-disable-next-line */
    }, [])

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
            JSON.stringify(sortCodeStringArray(listRegisterInSemester)) ===
            JSON.stringify(
                sortCodeStringArray(
                    listRegister.filter(i => i.semester.toString() === currentSemester.toString()).map((i) => ({ ...i, _id: i.subject._id }))
                )
            )
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
        let subject = validationCode(code)
        if (!subject) {
            message.error('Mã học phần không tồn tại!')
            return
        }
        if (checkIsExistedCode(listRegisterInSemester, subject._id)) {
            message.error('Trùng mã học phần!')
            return
        }
        if (!checkLimitedCredit(listRegisterInSemester, subject, studentInfomation.educationProgram.limitOfCredits)) {
            message.error('Giới hạn tín chỉ tối đa !!')
            return
        }
        subject = { ...subject, key: subject._id }
        setListRegisterInSemester([...listRegisterInSemester, subject])
    }

    const handleRemoveSubject = (record) => {
        setListRegisterInSemester(
            listRegisterInSemester.filter(
                (i) => i._id.toString() !== record.key.toString()
            )
        )
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
                    <a
                        onClick={() =>
                            !validateTimeToRegisterUnitOfStudy()
                                ? {} :
                            handleRemoveSubject(record)
                        }
                    >
                        <Text type="danger">Remove</Text>
                    </a>
                </Space>
            ),
        },
    ]

    const convertRegisterUnitDataBeforeSave = (list = []) => {
        const _listRegister = list.map((i) => ({
            semester: currentSemester,
            studentId: student.studentId,
            subject: i._id,
        }))
        return {
            semester: currentSemester,
            studentId: student.studentId,
            listRegister: _listRegister,
        }
    }

    const handleSubmit = async () => {
        const response = await sendRequest({
            method: RequestMethods.POST,
            url: 'http://localhost:4001/v1/student/register-unit-of-study',
            data: convertRegisterUnitDataBeforeSave(listRegisterInSemester),
        })
        if (response) {
            fetchListUnitOfStudy({
                studentId: student.studentId,
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

    const validateTimeToRegisterUnitOfStudy = () => {
        let _csemester = listSemester.find(
            (i) => i?.semester?.toString() === currentSemester?.toString()
        )
        let time = _csemester?.registerUnitOfStudyTime
        if (time) {
            let startTime = moment(formatDateFunc(time?.startTime), formatDate)
            let endTime = moment(formatDateFunc(time?.endTime), formatDate)
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

    const countCredit = (list = []) => {
        let count = 0
        list.forEach(i => count = Number(i?.credit) + count)
        return count
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
                    {!validateTimeToRegisterUnitOfStudy()
                        ? !currentSemester
                            ? ''
                            : `Không phải thời điểm đăng ký học phần kỳ ${currentSemester}`
                        : ''}
                </Text>
            </div>
            <Input.Group compact>
                <Input
                    style={{ width: '200px' }}
                    placeholder="Nhập mã học phần"
                    onChange={handleChangeCode}
                />
                <Button
                    type="primary"
                    onClick={handleAddUnitOfStudy}
                    disabled={!currentSemester || !validateTimeToRegisterUnitOfStudy()}
                >
                    Thêm
                </Button>
            </Input.Group>
            {currentSemester && <Text type="secondary">Số lượng tín chỉ đăng ký: {countCredit(listRegisterInSemester)}</Text>}
            <Table columns={columns} dataSource={listRegisterInSemester} />
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
                    disabled={!currentSemester || checkChangeListRegisterSubject()}
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
