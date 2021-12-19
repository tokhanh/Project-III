import { Button, Input, Table, Tooltip } from 'antd'
import React, { useState } from 'react'
import { useClassContext } from './Class'

const { Search } = Input

export default function OpenClassTab() {
    const { listClass, fetchData } = useClassContext()
    const [keySeach, setKeySearch] = useState('')

    const columns = [
        {
            title: 'Code',
            dataIndex: 'code',
            key: 'code',
        },
        {
            title: 'Subject',
            dataIndex: 'subjectName',
            key: 'subjectName',
        },
        {
            title: 'Subject Code',
            dataIndex: 'subjectCode',
            key: 'subjectCode',
        },
        {
            title: 'Time',
            dataIndex: 'time',
            key: 'time',
        },
        {
            title: 'Position',
            dataIndex: 'position',
            key: 'position',
        },
        {
            title: 'Number Registered',
            dataIndex: 'numberRegisteredStudent',
            key: 'numberRegisteredStudent',
        },
        {
            title: 'Maximum quantity',
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
                    placeholder="Seacrh Subject Code"
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
