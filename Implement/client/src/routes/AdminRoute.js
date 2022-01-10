import React from 'react'
import { Navigate } from 'react-router-dom'
import { useGlobalContext } from '../global/GlobalContext'

export default function AdminRoute({ component }) {
    const { isAdmin } = useGlobalContext()
    return isAdmin ? component : <Navigate to="/login" />
}
