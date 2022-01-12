import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainLayout from '../layout/MainLayout'
import Page404 from '../layout/Page404'
import ClassManagement from '../modules/education_management/class-management/ClassManagement'
import RegisterUnitManagement from '../modules/education_management/register-unit-management/RegisterUnitManagement'
import Class from '../modules/student/class/Class'
import ProfileAndEducationProgram from '../modules/student/profile_education/ProfileAndEducationProgram'
import Home from '../modules/users/Home'
import Login from '../modules/users/Login'
import AdminRoute from './AdminRoute'
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
                                <MainLayout
                                    component={<ProfileAndEducationProgram />}
                                />
                            }
                        />
                    }
                />
                <Route
                    path="/class"
                    element={
                        <PrivateRoute
                            component={<MainLayout component={<Class />} />}
                        />
                    }
                />
                <Route
                    path="/register-unit-of-study-management"
                    element={
                        <AdminRoute
                            component={
                                <MainLayout
                                    component={<RegisterUnitManagement />}
                                />
                            }
                        />
                    }
                />
                <Route
                    path="/class-management"
                    element={
                        <AdminRoute
                            component={
                                <MainLayout
                                    component={<ClassManagement />}
                                />
                            }
                        />
                    }
                />
                <Route path="*" element={<Page404 />} />
            </Routes>
        </BrowserRouter>
    )
}
