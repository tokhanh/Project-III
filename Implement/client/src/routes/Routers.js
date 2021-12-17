import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainLayout from '../layout/MainLayout'
import Page404 from '../layout/Page404'
import Class from '../modules/student/Class'
import ProfileAndEducationProgram from '../modules/student/ProfileAndEducationProgram'
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
                    path="/profile-and-education-program"
                    element={
                        <PrivateRoute
                            component={
                                <MainLayout component={<ProfileAndEducationProgram />} />
                            }
                        />
                    }
                />
                <Route
                    path="/class"
                    element={
                        <PrivateRoute
                            component={
                                <MainLayout component={<Class />} />
                            }
                        />
                    }
                />
                <Route path="*" element={<Page404 />} />
            </Routes>
        </BrowserRouter>
    )
}
