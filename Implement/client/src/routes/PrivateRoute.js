import React from 'react'
import { Navigate } from 'react-router-dom'
import { useGlobalContext } from '../global/GlobalContext'

export default function PrivateRoute({component}) {
    const { user } = useGlobalContext()
    return (
        user ? component : <Navigate to="/login" />
    )
}
