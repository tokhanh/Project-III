import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainLayout from '../layout/MainLayout'
import Page404 from '../layout/Page404'
import RegisterClass from '../modules/student/RegisterClass'
import RegisterUnit from '../modules/student/RegisterUnit'
import Home from '../modules/users/Home'
import Login from '../modules/users/Login'
import PrivateRoute from './PrivateRoute'

export default function Routers() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route
                    path="/"
                    element={
                        <PrivateRoute
                            component={<MainLayout component={<Home />} />}
                        />
                    }
                />
                <Route
                    path="/register-unit"
                    element={
                        <PrivateRoute
                            component={
                                <MainLayout component={<RegisterUnit />} />
                            }
                        />
                    }
                />
                <Route
                    path="/register-class"
                    element={
                        <PrivateRoute
                            component={
                                <MainLayout component={<RegisterClass />} />
                            }
                        />
                    }
                />
                <Route path="*" element={<Page404 />} />
            </Routes>
        </BrowserRouter>
    )
}
