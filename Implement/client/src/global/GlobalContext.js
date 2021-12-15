import React, { createContext, useContext, useState } from 'react'
import sendRequest from '../helpers/requestHelpers'
import { RequestMethods } from './Constants'

const GlobalContext = createContext()

export const useGlobalContext = () => {
    return useContext(GlobalContext)
}

export default function GlobalContextProvider({ children }) {
    const [user, setUser] = useState(localStorage.getItem('uid'))

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
        setUser(null)
    }

    const value = {
        user,
        login,
        logout,
        setCurrentUser
    }
    return (
        <GlobalContext.Provider value={value}>
            {children}
        </GlobalContext.Provider>
    )
}
