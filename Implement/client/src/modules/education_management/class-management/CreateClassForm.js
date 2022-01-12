import React, { useState } from 'react'
import { Form, Input, Select } from 'antd'
import styled from 'styled-components'

const { Option } = Select

export default function CreateClassForm() {
    const [dayValue, setDayValue] = useState(null)
    const [shiftValue, setShiftValue] = useState(null)

    const onChangeDayValue = (value) => {
        setDayValue(value)
    }

    const onChangeShiftValue = (value) => {
        setShiftValue(value)
    }
    const validateValue = () => {}

    return (
        <div>
            <Form name="basic" labelCol={{ span: 6 }} wrapperCol={{ span: 12 }}>
                <Label>Class Code: </Label>
                <Input />
                <Label>Subject: </Label>
                <Input />
                <Label>Subject Code: </Label>
                <Input />
                <Label>Time: </Label>
                <div>
                    <Label>Day: </Label>
                    <Select style={{ width: 150 }} onChange={onChangeDayValue}>
                        <Option value="2">Monday</Option>
                        <Option value="3">Tuesday</Option>
                        <Option value="4">Wednesday</Option>
                        <Option value="5">Thursday</Option>
                        <Option value="6">Friday</Option>
                    </Select>
                    <Label> Shift: </Label>
                    <Select
                        style={{ width: 150 }}
                        onChange={onChangeShiftValue}
                    >
                        <Option value="1">1</Option>
                        <Option value="2">2</Option>
                        <Option value="3">3</Option>
                        <Option value="4">4</Option>
                    </Select>
                </div>
                <Label>Position: </Label>
                <Input />
                <Label>Maximum number of students: </Label>
                <Input />
            </Form>
        </div>
    )
}

const Label = styled.label``
