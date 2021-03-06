import React, { useEffect, useState } from 'react'
import { Input, Form, Select, Button, message } from 'antd'
import styled from 'styled-components'

const { Option } = Select

export default function EditClassForm(props) {
    const {
        data,
        handleCancelEditModal,
        updateClassService,
        listClassInSemester,
    } = props
    const [currentClass, setCurrentClass] = useState({
        _id: data._id,
        code: data.code,
        subject: data.subject,
        subjectName: data.subjectName,
        subjectCode: data.subjectCode,
        time: data.time,
        position: data.position,
        maximum: data.maximum,
        students: data.students,
        defaultTime: data.defaultTime,
        semester: data.semester,
    })

    useEffect(() => {
        setCurrentClass({
            ...currentClass,
            _id: data._id,
            code: data.code,
            subject: data.subject,
            subjectName: data.subjectName,
            subjectCode: data.subjectCode,
            time: data.time,
            position: data.position,
            maximum: data.maximum,
            students: data.students,
            defaultTime: data.defaultTime,
            semester: data.semester,
        })
        /* eslint-disable-next-line */
    }, [JSON.stringify(data)])

    const onChangePosition = (e) => {
        setCurrentClass({
            ...currentClass,
            position: e.target.value,
        })
    }
    const onChangeMaximumOfStudent = (e) => {
        setCurrentClass({
            ...currentClass,
            maximum: Number(e.target.value),
        })
    }

    const onChangeDayValue = (value) => {
        setCurrentClass({
            ...currentClass,
            defaultTime: {
                ...currentClass.defaultTime,
                day: Number(value),
            },
        })
    }

    const onChangeShiftValue = (value) => {
        setCurrentClass({
            ...currentClass,
            defaultTime: {
                ...currentClass.defaultTime,
                shift: Number(value),
            },
        })
    }

    const validateDuplicateTime = () => {
        const listClassInTheSamePlace = listClassInSemester
            .filter((i) => i.code.toString() !== currentClass.code.toString())
            .filter(
                (i) =>
                    i.position?.trim().toString() ===
                    currentClass?.position.trim().toString()
            )
        let existedTime = listClassInTheSamePlace.find(
            (i) =>
                i.defaultTime?.day?.toString() ===
                    currentClass?.defaultTime.day?.toString() &&
                i.defaultTime.shift.toString() ===
                    currentClass?.defaultTime?.shift?.toString()
        )
        return existedTime
    }

    const handleUpdateClass = () => {
        let duplicateClass = validateDuplicateTime()
        if (duplicateClass) {
            message.error(
                `Tr??ng th???i kh??a bi???u v?? ?????a ??i???m c???a l???p: ${duplicateClass.subjectName}- M?? l???p: ${duplicateClass.code}`
            )
            return
        }
        updateClassService(currentClass)
        handleCancelEditModal()
    }

    return (
        <>
            <Form name="basic" labelCol={{ span: 6 }} wrapperCol={{ span: 12 }}>
                <Label>M?? l???p</Label>
                <Input disabled={true} value={currentClass.code} />
                <Label>M??n h???c</Label>
                <Input disabled={true} value={currentClass.subjectName} />
                <Label>M?? m??n h???c</Label>
                <Input disabled={true} value={currentClass.subjectCode} />
                <Label>Th???i gian</Label>
                <div>
                    <Label>Th???: </Label>
                    <Select
                        style={{ width: 150 }}
                        value={Number(currentClass.defaultTime.day)}
                        onChange={onChangeDayValue}
                        disabled
                    >
                        <Option value={2}>Th??? 2</Option>
                        <Option value={3}>Th??? 3</Option>
                        <Option value={4}>Th??? 4</Option>
                        <Option value={5}>Th??? 5</Option>
                        <Option value={6}>Th??? 6</Option>
                    </Select>
                    <Label> Ca: </Label>
                    <Select
                        style={{ width: 150 }}
                        value={Number(currentClass.defaultTime.shift)}
                        onChange={onChangeShiftValue}
                        disabled
                    >
                        <Option value={1}>1</Option>
                        <Option value={2}>2</Option>
                        <Option value={3}>3</Option>
                        <Option value={4}>4</Option>
                    </Select>
                </div>
                <Label>?????a ??i???m</Label>
                <Input
                    disabled
                    value={currentClass.position}
                    onChange={onChangePosition}
                />
                <Label>S??? l?????ng sinh vi??n t???i ??a</Label>
                <Input
                    value={currentClass.maximum}
                    onChange={onChangeMaximumOfStudent}
                    type={'number'}
                />
            </Form>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    marginTop: '20px',
                }}
            >
                <Button
                    style={{ margin: '5px' }}
                    onClick={handleCancelEditModal}
                >
                    H???y b???
                </Button>
                <Button
                    type="primary"
                    style={{ margin: '5px' }}
                    onClick={(_) => handleUpdateClass()}
                >
                    L??u
                </Button>
            </div>
        </>
    )
}

const Label = styled.label``
