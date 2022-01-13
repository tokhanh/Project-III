import {
    Button,
    DatePicker,
    Input,
    message,
    Modal,
    Select,
    Space,
    Typography,
} from 'antd'
import React, { useEffect, useState } from 'react'
import moment from 'moment'
import styled from 'styled-components'
import sendRequest from '../../../helpers/requestHelpers'
import { RequestMethods } from '../../../global/Constants'

const { Title } = Typography
const { RangePicker } = DatePicker
const { Option } = Select

const formatDate = 'DD/MM/YYYY HH:mm:ss'

export default function StudyPlan() {
    const [listTimestamp, setListTimeStamp] = useState([])
    const [newSemester, setNewSemester] = useState(0)
    const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false)

    const handleOpenConfirmModal = () => {
        setIsOpenConfirmModal(true)
    }
    const handleCancelConfirmModal = () => {
        setIsOpenConfirmModal(false)
    }
    const handleAddSemesterSubmit = () => {
        if (!validateValueOfNewSemester()) {
            message.error('Giá trị phải là lớn nhất!')
            return
        }
        message.success('Thêm học kỳ mới thành công!')
        setIsOpenConfirmModal(false)
    }

    const validateValueOfNewSemester = () => {
        if (newSemester <= Number(listTimestamp[0].semester)) {
            return false
        }
        return true
    }

    const fetchTimestamp = async (data = {}) => {
        const response = await sendRequest({
            url: 'http://localhost:4001/v1/training-department/timestamp',
            method: RequestMethods.GET,
            data: data,
        })
        if (response) {
            setListTimeStamp(
                //set list sortable semester
                response.data.content.sort((a, b) => b.semester - a.semester)
            )
        } else {
            message.error('Lấy danh sách các kỳ thất bại!')
        }
    }

    const handleUpdateTime = async (data = {}) => {
        if (!isValidTime()) {
            message.error('Thời gian không được để trống !')
            return
        }
        const response = await sendRequest({
            url: 'http://localhost:4001/v1/training-department/timestamp',
            method: RequestMethods.PUT,
            data: data,
        })
        if (response) {
            fetchTimestamp()
            message.success('Cập nhật thời gian thành công!')
        } else {
            message.error('Cập nhật thời gian thất bại!')
        }
    }
    const [currentTimeStamp, setCurrentTimeStamp] = useState({
        semester: '',
        startTimeRegisterUnit: '',
        endTimeRegisterUnit: '',
        startTimeRegisterPriotyClassTime: '',
        endTimeRegisterPriotyClassTime: '',
        startTimeRegisterAdjustedClassTime: '',
        endTimeRegisterAdjustedClassTime: '',
    })
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

    const handleChangeSemester = (value) => {
        const _timestamp = listTimestamp.find(
            (i) => i.semester.toString() === value.toString()
        )
        setCurrentTimeStamp({
            semester: _timestamp?.semester,
            startTimeRegisterUnit: formatDateFunc(
                _timestamp?.registerUnitOfStudyTime?.startTime
            ),
            endTimeRegisterUnit: formatDateFunc(
                _timestamp?.registerUnitOfStudyTime?.endTime
            ),
            startTimeRegisterPriotyClassTime: formatDateFunc(
                _timestamp?.registerPriotyClassTime?.startTime
            ),
            endTimeRegisterPriotyClassTime: formatDateFunc(
                _timestamp?.registerPriotyClassTime?.endTime
            ),
            startTimeRegisterAdjustedClassTime: formatDateFunc(
                _timestamp?.registerAdjustedClassTime?.startTime
            ),
            endTimeRegisterAdjustedClassTime: formatDateFunc(
                _timestamp?.registerAdjustedClassTime?.endTime
            ),
        })
    }

    const handleChangeRegisterUnitTime = (value, dateString) => {
        setCurrentTimeStamp({
            ...currentTimeStamp,
            startTimeRegisterUnit: dateString[0],
            endTimeRegisterUnit: dateString[1],
        })
    }

    const handleChangeRegisterPriotyClassTime = (value, dateString) => {
        setCurrentTimeStamp({
            ...currentTimeStamp,
            startTimeRegisterPriotyClassTime: dateString[0],
            endTimeRegisterPriotyClassTime: dateString[1],
        })
    }

    const handleChangeRegisterAdjustedClassTime = (value, dateString) => {
        setCurrentTimeStamp({
            ...currentTimeStamp,
            startTimeRegisterAdjustedClassTime: dateString[0],
            endTimeRegisterAdjustedClassTime: dateString[1],
        })
    }

    useEffect(() => {
        return fetchTimestamp()
    }, [])

    const _startDateUnitOfStudy = moment(
        currentTimeStamp.startTimeRegisterUnit,
        formatDate
    )
    const _endDateUnitOfStudy = moment(
        currentTimeStamp.endTimeRegisterUnit,
        formatDate
    )

    const _startDateRegisterPrioty = moment(
        currentTimeStamp.startTimeRegisterPriotyClassTime,
        formatDate
    )
    const _endDateRegisterPrioty = moment(
        currentTimeStamp.endTimeRegisterPriotyClassTime,
        formatDate
    )

    const _startDateRegisterAdjusted = moment(
        currentTimeStamp.startTimeRegisterAdjustedClassTime,
        formatDate
    )

    const _endDateRegisterAdjusted = moment(
        currentTimeStamp.endTimeRegisterAdjustedClassTime,
        formatDate
    )
    const isValidTime = () => {
        return (
            _startDateUnitOfStudy.isValid() &&
            _endDateUnitOfStudy.isValid() &&
            _startDateRegisterPrioty.isValid() &&
            _endDateRegisterPrioty.isValid() &&
            _startDateRegisterAdjusted.isValid() &&
            _endDateRegisterAdjusted.isValid()
        )
    }

    return (
        <Space
            style={{
                marginLeft: '10px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'start',
            }}
        >
            <Block>
                <Title level={5}>Thêm kỳ học</Title>
                <div style={{ display: 'flex' }}>
                    <Input
                        value={newSemester}
                        type="number"
                        onChange={(e) => setNewSemester(e.target.value)}
                    />
                    <Button onClick={handleOpenConfirmModal}>Thêm</Button>
                </div>
            </Block>
            <Block>
                <Title level={5}>Kỳ học</Title>
                <Select style={{ width: 150 }} onChange={handleChangeSemester}>
                    {listTimestamp.map((i) => (
                        <Option key={i._id} value={i?.semester}>
                            {i?.semester}
                        </Option>
                    ))}
                </Select>
            </Block>
            <Block>
                <Title level={5}>Thời điểm đăng ký học phần</Title>
                <RangePicker
                    disabled={currentTimeStamp.semester.length === 0}
                    format={formatDate}
                    showTime
                    onChange={handleChangeRegisterUnitTime}
                    value={[
                        _startDateUnitOfStudy.isValid()
                            ? _startDateUnitOfStudy
                            : null,
                        _endDateUnitOfStudy.isValid()
                            ? _endDateUnitOfStudy
                            : null,
                    ]}
                />
            </Block>
            <Block>
                <Title level={5}>Thời điểm đăng ký lớp học ưu tiên</Title>
                <RangePicker
                    disabled={currentTimeStamp.semester.length === 0}
                    showTime
                    format={formatDate}
                    onChange={handleChangeRegisterPriotyClassTime}
                    value={[
                        _startDateRegisterPrioty.isValid()
                            ? _startDateRegisterPrioty
                            : null,
                        _endDateRegisterPrioty.isValid()
                            ? _endDateRegisterPrioty
                            : null,
                    ]}
                />
            </Block>
            <Block>
                <Title level={5}>Thời điểm đăng ký lớp học điều chỉnh</Title>
                <RangePicker
                    disabled={currentTimeStamp.semester.length === 0}
                    showTime
                    format={formatDate}
                    onChange={handleChangeRegisterAdjustedClassTime}
                    value={[
                        _startDateRegisterAdjusted.isValid()
                            ? _startDateRegisterAdjusted
                            : null,
                        _endDateRegisterAdjusted.isValid()
                            ? _endDateRegisterAdjusted
                            : null,
                    ]}
                />
            </Block>
            <Block>
                <Button onClick={() => handleUpdateTime(currentTimeStamp)}>
                    Lưu
                </Button>
            </Block>
            <Modal
                visible={isOpenConfirmModal}
                onOk={handleAddSemesterSubmit}
                onCancel={handleCancelConfirmModal}
                title="Thêm kỳ học"
                okText="Thêm"
                cancelText="Hủy bỏ"
            >
                Xác nhận thêm kỳ học {newSemester} ?
            </Modal>
        </Space>
    )
}

const Block = styled.div`
    margin: 5px;
`
