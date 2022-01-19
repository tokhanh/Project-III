import { message, Select, Table, Typography } from 'antd'
import React, { useEffect, useState } from 'react'
import { RequestMethods } from '../../../global/Constants'
import sendRequest from '../../../helpers/requestHelpers'

const { Title } = Typography
const { Option } = Select

export default function ListRegisterUnitOfStudy() {
    const [data, setData] = useState([])
    const [listTimestamp, setListTimeStamp] = useState([])

    const listRegisterDisplay = (data) => {
        return data.map((i) => ({
            ...i[1]?.data,
            count: i[1]?.count,
            key: i[1]?.data?.code,
            institudeCode: i[1]?.data?.institude?.institudeCode,
        }))
    }
    const fetchListRegister = async (data = {}) => {
        const response = await sendRequest({
            url: 'http://localhost:4001/v1/training-department/listRegister',
            method: RequestMethods.GET,
            data: data,
        })
        if (response) {
            setData(listRegisterDisplay(response.data.content))
        } else {
            message.error('Lấy danh sách các kỳ thất bại!')
        }
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
    useEffect(() => {
        const func = () => {
            fetchTimestamp()
        }
        return func()
    }, [])

    const handleChangeSemester = (value) => {
        fetchListRegister({
            semester: value,
        })
    }
    const columns = [
        {
            title: 'Mã học phần',
            dataIndex: 'code',
            key: 'code',
        },
        {
            title: 'Tên học phần ',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Viện đào tạo',
            dataIndex: 'institudeCode',
            key: 'institudeCode',
        },
        {
            title: 'Tín chỉ',
            dataIndex: 'credit',
            key: 'credit',
        },
        {
            title: 'Số lượng sinh viên đăng ký',
            dataIndex: 'count',
            key: 'count',
        },
    ]

    return (
        <React.Fragment>
            <div style={{ marginLeft: '20px', marginBottom: '20px' }}>
                <Title level={5}>Kỳ học</Title>
                <Select style={{ width: 150 }} onChange={handleChangeSemester}>
                    {listTimestamp.map((i) => (
                        <Option key={i._id} value={i?.semester}>
                            {i?.semester}
                        </Option>
                    ))}
                </Select>
            </div>
            <div style={{margin: '0 20px'}}>
                <Table columns={columns} dataSource={data}></Table>
            </div>
        </React.Fragment>
    )
}
