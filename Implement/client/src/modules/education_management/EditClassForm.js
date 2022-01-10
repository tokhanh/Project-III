import React, { useEffect, useState } from 'react'
import { Input, Form, Space, Table, List, Select } from 'antd'
import styled from 'styled-components'

const { Option } = Select

export default function EditClassForm({ data }) {
    const [currentClass, setCurrentClass] = useState({
        code: data.code,
        subject: data.subject,
        subjectCode: data.subjectCode,
        time: data.time,
        position: data.position,
        maximum: data.maximum,
        students: data.students,
        defaultTime: data.defaultTime,
    })

    useEffect(() => {
        setCurrentClass({
            ...currentClass,
            code: data.code,
            subject: data.subject,
            subjectCode: data.subjectCode,
            time: data.time,
            position: data.position,
            maximum: data.maximum,
            students: data.students,
            defaultTime: data.defaultTime,
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
            maximum: e.target.value,
        })
    }

    const onChangeDayValue = (value) => {
        setCurrentClass({
            ...currentClass,
            defaultTime: {
                ...currentClass.defaultTime,
                day: value,
            },
        })
    }

    const onChangeShiftValue = (value) => {
        setCurrentClass({
            ...currentClass,
            defaultTime: {
                ...currentClass.defaultTime,
                shift: value,
            },
        })
    }

    const convertDate = (data) => {
        switch (data) {
            case 2: {
                return 'Monday'
            }
            case 3: {
                return 'Tuesday'
            }
            case 4: {
                return 'Wednesday'
            }
            case 5: {
                return 'Thursday'
            }
            case 6: {
                return 'Friday'
            }
            default:
                break
        }
    }

    return (
        <>
            <Form name="basic" labelCol={{ span: 6 }} wrapperCol={{ span: 12 }}>
                <Label>Class Code</Label>
                <Input disabled={true} value={currentClass.code} />
                <Label>Subject</Label>
                <Input disabled={true} value={currentClass.subject} />
                <Label>Subject Code</Label>
                <Input disabled={true} value={currentClass.subjectCode} />
                <Label>Time</Label>
                <div>
                    <Label>Day: </Label>
                    <Select
                        style={{ width: 150 }}
                        defaultValue={convertDate(currentClass.defaultTime.day)}
                        onChange={onChangeDayValue}
                    >
                        <Option value="2">Monday</Option>
                        <Option value="3">Tuesday</Option>
                        <Option value="4">Wednesday</Option>
                        <Option value="5">Thursday</Option>
                        <Option value="6">Friday</Option>
                    </Select>
                    <Label> Shift: </Label>
                    <Select
                        style={{ width: 150 }}
                        defaultValue={currentClass.defaultTime.shift}
                        onChange={onChangeShiftValue}
                    >
                        <Option value="1">1</Option>
                        <Option value="2">2</Option>
                        <Option value="3">3</Option>
                        <Option value="4">4</Option>
                    </Select>
                </div>
                <Label>Position</Label>
                <Input
                    value={currentClass.position}
                    onChange={onChangePosition}
                />
                <Label>Maximum number of students</Label>
                <Input
                    value={currentClass.maximum}
                    onChange={onChangeMaximumOfStudent}
                    type={'number'}
                />
            </Form>
            <List
                itemLayout="horizontal"
                dataSource={[{ name: 'to khanh' }, { name: 'khanh to' }]}
                renderItem={(item) => (
                    <List.Item>
                        <List.Item.Meta name={item.name} />
                    </List.Item>
                )}
            />
        </>
    )
}

const Label = styled.label``
