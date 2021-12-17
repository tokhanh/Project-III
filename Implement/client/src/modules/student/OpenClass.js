import { Button, Input, message, Table, Tooltip } from 'antd'
import React, { useEffect, useState } from 'react'
import { RequestMethods } from '../../global/Constants'
import sendRequest from '../../helpers/requestHelpers'

const { Search } = Input

export default function OpenClass() {
    const [listClass, setListClass] = useState([])
    const [keySeach, setKeySearch] = useState('')

    const columns = [
        {
            title: 'Code',
            dataIndex: 'code',
            key: 'code',
        },
        {
            title: 'Subject',
            dataIndex: 'subject',
            key: 'subject',
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

    const fetchData = async (data = {}) => {
        const response = await sendRequest({
            url: 'http://localhost:4001/v1/training-department/class',
            method: RequestMethods.GET,
            data: data,
        })
        if (response) {
            setListClass(
                response.data.content.map((i) => ({
                    key: i.code,
                    code: i.code,
                    subject: i.subjectId.name,
                    subjectCode: i.subjectId.code,
                    time: `${convertDate(i.time.day)} - Shift: ${i.time.shift}`,
                    position: i.position,
                    numberRegisteredStudent: i.students.length,
                    maximum: i.maximum,
                }))
            )
        } else {
            message.error('Get open class failed!')
        }
    }

    const handleRefreshData = () => {
        fetchData()
    }

    const handleChangeKeySearch = (e) => setKeySearch(e.target.value)

    const handleSearch = () => {
        fetchData({
            codeKey: keySeach,
        })
    }

    useEffect(() => {
        return fetchData()
    }, [])

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
