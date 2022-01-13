import { Button, Input, Table, Tooltip } from 'antd'
import React, { useState } from 'react'
import { useClassContext } from './Class'

const { Search } = Input

export default function OpenClassTab() {
    const { listClass, fetchData } = useClassContext()
    const [keySeach, setKeySearch] = useState('')

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

    const handleRefreshData = () => {
        fetchData()
    }

    const handleChangeKeySearch = (e) => setKeySearch(e.target.value)

    const handleSearch = () => {
        fetchData({
            codeKey: keySeach,
        })
    }

    return (
        <>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row-reverse',
                    padding: '10px',
                }}
            >
                <Search
                    placeholder="Nhập mã môn học"
                    onSearch={handleSearch}
                    onChange={handleChangeKeySearch}
                />
                <Tooltip title="Refresh">
                    <Button onClick={handleRefreshData}>
                        <i className="fas fa-sync-alt"></i>
                    </Button>
                </Tooltip>
            </div>
            <Table
                dataSource={listClass}
                columns={columns}
                bordered
                title={() => ''}
                footer={() => ''}
            />
        </>
    )
}
