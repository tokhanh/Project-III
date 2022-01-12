import React, { useEffect, useState } from 'react'
import { Input, Form, Select, Button } from 'antd'
import styled from 'styled-components'

const { Option } = Select

export default function EditClassForm(props) {
    const { data, handleCancelEditModal, updateClassService } = props
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

    return (
        <>
            <Form name="basic" labelCol={{ span: 6 }} wrapperCol={{ span: 12 }}>
                <Label>Mã lớp</Label>
                <Input disabled={true} value={currentClass.code} />
                <Label>Môn học</Label>
                <Input disabled={true} value={currentClass.subjectName} />
                <Label>Mã môn học</Label>
                <Input disabled={true} value={currentClass.subjectCode} />
                <Label>Thời gian</Label>
                <div>
                    <Label>Thứ: </Label>
                    <Select
                        style={{ width: 150 }}
                        value={Number(currentClass.defaultTime.day)}
                        onChange={onChangeDayValue}
                    >
                        <Option value={2}>Thứ 2</Option>
                        <Option value={3}>Thứ 3</Option>
                        <Option value={4}>Thứ 4</Option>
                        <Option value={5}>Thứ 5</Option>
                        <Option value={6}>Thứ 6</Option>
                    </Select>
                    <Label> Ca: </Label>
                    <Select
                        style={{ width: 150 }}
                        value={Number(currentClass.defaultTime.shift)}
                        onChange={onChangeShiftValue}
                    >
                        <Option value={1}>1</Option>
                        <Option value={2}>2</Option>
                        <Option value={3}>3</Option>
                        <Option value={4}>4</Option>
                    </Select>
                </div>
                <Label>Địa điểm</Label>
                <Input
                    value={currentClass.position}
                    onChange={onChangePosition}
                />
                <Label>Số lượng sinh viên tối đa</Label>
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
                    Hủy bỏ
                </Button>
                <Button
                    style={{ margin: '5px' }}
                    onClick={(_) => {
                        updateClassService(currentClass)
                        handleCancelEditModal()
                    }}
                >
                    Lưu
                </Button>
            </div>
        </>
    )
}

const Label = styled.label``
