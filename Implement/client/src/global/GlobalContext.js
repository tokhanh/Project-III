import { message } from 'antd'
import React, { createContext, useContext, useEffect, useState } from 'react'
import sendRequest from '../helpers/requestHelpers'
import { RequestMethods } from './Constants'

const GlobalContext = createContext()

export const useGlobalContext = () => {
    return useContext(GlobalContext)
}

export default function GlobalContextProvider({ children }) {
    const [user, setUser] = useState(localStorage.getItem('uid'))
    const [isAdmin, setIsAdmin] = useState(null)
    const [listSemester, setListSemester] = useState([])

    function setCurrentUser(user) {
        setUser(user)
        localStorage.setItem('uid', user)
    }

    const login = async (username, password) => {
        const response = await sendRequest({
            url: 'http://localhost:4001/v1/user/login',
            method: RequestMethods.POST,
            data: {
                username: username,
                password: password,
            },
        })
        return response
    }

    const logout = () => {
        localStorage.removeItem('uid')
        if (isAdmin) {
            setIsAdmin(null)
        }
        setUser(null)
    }

    const fetchTimestamp = async (data = {}) => {
        const response = await sendRequest({
            url: 'http://localhost:4001/v1/training-department/timestamp',
            method: RequestMethods.GET,
            data: data,
        })
        if (response) {
            const content = response.data.content.sort(
                (a, b) => b.semester - a.semester
            )
            setListSemester(content)
        } else {
            message.error('Lấy danh sách các kỳ thất bại!')
        }
    }
    useEffect(() => {
        return fetchTimestamp()
    }, [])
    useEffect(() => {
        if (user === '61bc89e654002066071c7f62') {
            setIsAdmin(user)
        }
    }, [user])

    const value = {
        user,
        isAdmin,
        login,
        logout,
        setCurrentUser,
        listSemester
    }
    
    return (
        <GlobalContext.Provider value={value}>
            {children}
        </GlobalContext.Provider>
    )
}
