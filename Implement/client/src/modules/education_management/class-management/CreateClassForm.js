import React, { useEffect, useState } from 'react'
import { Button, Form, Input, message, Select, Modal } from 'antd'
import styled from 'styled-components'
import sendRequest from '../../../helpers/requestHelpers'
import { RequestMethods } from '../../../global/Constants'

const { Option } = Select

export default function CreateClassForm(props) {
    const {
        semester,
        listClassInSemester,
        handleCancelCreateClassModal,
        refreshData,
    } = props
    const [newClassData, setNewClassData] = useState({
        code: '',
        time: {
            day: '',
            shift: '',
        },
        subjectId: '',
        position: '',
        maximum: '',
        semester: semester,
    })

    const onChangeClassCode = (e) => {
        setNewClassData({
            ...newClassData,
            code: e.target.value,
        })
    }

    const onChangePosition = (e) => {
        setNewClassData({
            ...newClassData,
            position: e.target.value,
        })
    }

    const onChangeMaximumNumber = (e) => {
        setNewClassData({
            ...newClassData,
            maximum: Number(e.target.value),
        })
    }

    const onChangeDateTime = (value) => {
        setNewClassData({
            ...newClassData,
            time: {
                ...newClassData.time,
                day: Number(value),
            },
        })
    }

    const onChangeShiftTime = (value) => {
        setNewClassData({
            ...newClassData,
            time: {
                ...newClassData.time,
                shift: Number(value),
            },
        })
    }

    const onSelectSubject = (value) => {
        setNewClassData({
            ...newClassData,
            subjectId: value,
        })
    }

    const [listSubject, setListSubject] = useState([])
    const fetchListSubject = async (data = {}) => {
        const response = await sendRequest({
            url: 'http://localhost:4001/v1/training-department/subject',
            method: RequestMethods.GET,
            data: data,
        })
        if (response) {
            setListSubject(response.data.content)
        } else {
            message.error('L???y danh s??ch m??n h???c th???t b???i!')
        }
    }
    const updateNewClass = async (data = {}) => {
        const response = await sendRequest({
            url: 'http://localhost:4001/v1/training-department/class',
            method: RequestMethods.POST,
            data: data,
        })
        if (response) {
            refreshData()
            message.success('T???o l???p m???i th??nh c??ng!')
        } else {
            message.error('T???o m???i l???p th???t b???i!')
        }
    }

    useEffect(() => {
        return fetchListSubject()
    }, [])
    const validateInput = () => {
        return (
            newClassData.code.toString() === '' ||
            newClassData.time.day.toString() === '' ||
            newClassData.time.shift.toString() === '' ||
            newClassData.maximum.toString() === '' ||
            newClassData.position.toString() === '' ||
            newClassData.subjectId.toString() === ''
        )
    }

    const validateClassCode = () => {
        let isExistedCode = listClassInSemester.some(
            (i) => i.code.toString() === newClassData.code.toString()
        )
        return isExistedCode
    }
    const validateDuplicateTime = () => {
        const listClassInTheSamePlace = listClassInSemester.filter(
            (i) =>
                i.position.trim().toString() ===
                newClassData.position.trim().toString()
        )
        let existedTime = listClassInTheSamePlace.find(
            (i) =>
                i.defaultTime.day.toString() ===
                    newClassData.time.day.toString() &&
                i.defaultTime.shift.toString() ===
                    newClassData.time.shift.toString()
        )
        return existedTime
    }

    const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false)
    const handleOpenConfirmModal = () => {
        if (validateInput()) {
            message.error('Xin h??y ??i???n ?????y ????? c??c tr?????ng th??ng tin!')
            return
        }
        if (validateClassCode()) {
            message.error('M?? l???p h???c ???? t???n t???i!')
            return
        }
        let duplicateClass = validateDuplicateTime()
        if (duplicateClass) {
            message.error(
                `Tr??ng th???i kh??a bi???u v?? ?????a ??i???m c???a l???p: ${duplicateClass.subjectName}- M?? l???p: ${duplicateClass.code}`
            )
            return
        }
        setIsOpenConfirmModal(true)
    }
    const handleCancelConfirmModal = () => {
        setIsOpenConfirmModal(false)
    }
    const handleSubmitCreateNewClass = () => {
        updateNewClass(newClassData)
        refreshData()
        handleCancelConfirmModal()
        handleCancelCreateClassModal()
    }

    useEffect(() => {
        setNewClassData({
            ...newClassData,
            semester: semester,
        })
    /* eslint-disable-next-line */
    }, [semester])

    return (
        <div>
            <Form name="basic" labelCol={{ span: 6 }} wrapperCol={{ span: 12 }}>
                <Label>M?? l???p: </Label>
                <Input type="number" onChange={onChangeClassCode} />
                <Label>M??n h???c: </Label>
                <div>
                    <Select
                        style={{ width: 250 }}
                        showSearch
                        placeholder="Nh???p m?? m??n h???c"
                        optionFilterProp="children"
                        onChange={onSelectSubject}
                        filterOption={(input, option) =>
                            option.children[0]
                                .toLowerCase()
                                .indexOf(input.toLowerCase()) >= 0
                        }
                    >
                        {listSubject.map((i) => (
                            <Option key={i._id} value={i._id}>
                                {i.code} - {i.name}
                            </Option>
                        ))}
                    </Select>
                </div>
                <Label>Th???i gian: </Label>
                <div>
                    <Label>Th???: </Label>
                    <Select style={{ width: 150 }} onChange={onChangeDateTime}>
                        <Option value={2}>Th??? 2</Option>
                        <Option value={3}>Th??? 3</Option>
                        <Option value={4}>Th??? 4</Option>
                        <Option value={5}>Th??? 5</Option>
                        <Option value={6}>Th??? 6</Option>
                    </Select>
                    <Label> Ca: </Label>
                    <Select style={{ width: 150 }} onChange={onChangeShiftTime}>
                        <Option value={1}>1</Option>
                        <Option value={2}>2</Option>
                        <Option value={3}>3</Option>
                        <Option value={4}>4</Option>
                    </Select>
                </div>
                <Label>?????a ??i???m: </Label>
                <Input onChange={onChangePosition} />
                <Label>S??? l?????ng sinh vi??n ????ng k?? t???i ??a: </Label>
                <Input type="number" onChange={onChangeMaximumNumber} />
            </Form>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    marginTop: '20px',
                }}
            >
                <Button
                    style={{ marginRight: '10px' }}
                    onClick={handleCancelCreateClassModal}
                >
                    H???y b???
                </Button>
                <Button onClick={handleOpenConfirmModal}>Th??m l???p</Button>
            </div>
            <Modal
                visible={isOpenConfirmModal}
                onCancel={handleCancelConfirmModal}
                onOk={handleSubmitCreateNewClass}
                okText="X??c nh???n"
                cancelText="H???y b???"
                title="X??c nh???n th??m l???p ?"
            >
                T???o th??m l???p h???c m?? l???p {newClassData.code} ?
            </Modal>
        </div>
    )
}

const Label = styled.label``
