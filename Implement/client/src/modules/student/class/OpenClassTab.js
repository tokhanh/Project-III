import { Input, Table, Select, Typography } from 'antd'
import React, { useState } from 'react'
import { useClassContext } from './Class'
const { Option } = Select
const { Title } = Typography
const { Search } = Input

export default function OpenClassTab(props) {
    const { listSemester } = props
    const { listClass } = useClassContext()

    const columns = [
        {
            title: 'Mã lớp',
            dataIndex: 'code',
            key: 'code',
        },
        {
            title: 'Môn học',
            dataIndex: 'subjectName',
            key: 'subjectName',
        },
        {
            title: 'Mã môn học',
            dataIndex: 'subjectCode',
            key: 'subjectCode',
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
            title: 'Đã đăng ký',
            dataIndex: 'numberRegisteredStudent',
            key: 'numberRegisteredStudent',
        },
        {
            title: 'Số lượng sinh viên tối đa',
            dataIndex: 'maximum',
            key: 'maximum',
        },
    ]

    const [classCodeKeySearch, setClassCodeKeySearch] = useState('')
    const [subjectCodeKeySearch, setSubjectCodeKeySearch] = useState('')
    const handleChangeSubjectCodeKeySearch = (e) =>
        setSubjectCodeKeySearch(e.target.value)
    const handleChangeClassCodeKeySearch = (e) =>
        setClassCodeKeySearch(e.target.value)

    const handleSubjectCodeSearch = () => {
        let keyCode = new RegExp(`${subjectCodeKeySearch}`, 'gi')
        setListClassInSemester(
            listClass
                .filter(
                    (i) => i.semester.toString() === currentSemester?.toString()
                )
                .filter((i) => i.subjectCode.toString().match(keyCode))
        )
    }
    const handleClassCodeSearch = () => {
        let keyCode = new RegExp(`${classCodeKeySearch}`, 'gi')
        setListClassInSemester(
            listClass
                .filter(
                    (i) => i.semester.toString() === currentSemester?.toString()
                )
                .filter((i) => i.code.toString().match(keyCode))
        )
    }

    const [currentSemester, setCurrentSemester] = useState(null)
    const [listClassInSemester, setListClassInSemester] = useState([])
    const onChangeSemester = (value) => {
        setCurrentSemester(value)
        setListClassInSemester(
            listClass.filter((i) => i.semester.toString() === value.toString())
        )
    }

    return (
        <>
            <div style={{ margin: '0 10px' }}>
                <Title level={5}>Chọn kỳ học</Title>
                <Select style={{ width: 150 }} onChange={onChangeSemester}>
                    {listSemester.map((i) => (
                        <Option key={i._id} value={i.semester}>
                            {i.semester}
                        </Option>
                    ))}
                </Select>
            </div>
            <div
                style={{
                    display: 'flex',
                    margin: '10px 10px',
                }}
            >
                <Search
                    placeholder="Tìm kiếm mã lớp"
                    onSearch={handleClassCodeSearch}
                    onChange={handleChangeClassCodeKeySearch}
                />
                <Search
                    placeholder="Tìm kiếm mã môn học"
                    onSearch={handleSubjectCodeSearch}
                    onChange={handleChangeSubjectCodeKeySearch}
                />
            </div>
            <div style={{ margin: '0 10px' }}>
                <Table
                    dataSource={listClassInSemester}
                    columns={columns}
                    bordered
                    title={() => ''}
                    footer={() => ''}
                />
            </div>
        </>
    )
}
