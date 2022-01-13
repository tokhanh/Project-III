import { message } from 'antd'
import React, { useEffect, useState } from 'react'
import { RequestMethods } from '../../../global/Constants'
import sendRequest from '../../../helpers/requestHelpers'

export default function ListRegisterUnitOfStudy() {
     const [data, setData] = useState([])
    const fetchListRegister = async (data = {}) => {
        const response = await sendRequest({
            url: 'http://localhost:4001/v1/training-department/listRegister',
            method: RequestMethods.GET,
            data: data,
        })
        if (response) {
            setData(
                //set list sortable semester
                response.data.content
            )
        } else {
            message.error('Lấy danh sách các kỳ thất bại!')
        }
    }
    useEffect(() => {
        return fetchListRegister()
    }, [])

    console.log(data)
    return (
        <div>
            
        </div>
    )
}
