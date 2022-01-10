import { Dropdown, Layout, Menu } from 'antd'
import { Content, Footer, Header } from 'antd/lib/layout/layout'
import Sider from 'antd/lib/layout/Sider'
import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useGlobalContext } from '../global/GlobalContext'

export default function MainLayout({ component }) {
    const { logout, isAdmin } = useGlobalContext()

    const studentLinkList = [
        { path: '/', to: 'Home' },
        { path: '/profile-and-education-program', to: 'Profile & Education' },
        { path: '/class', to: 'Class' },
    ]

    const adminLinkList = [
        { path: '/register-unit-of-study-management', to: 'List Register Unit' },
        { path: '/class-management', to: 'Class Management' },
        { path: '/education-management', to: 'Education Management' },
    ]
    const [linkList, setLinkList] = useState([])

    useEffect(() => {
        setLinkList(isAdmin ? adminLinkList : studentLinkList)
        /* eslint-disable-next-line */
    }, [isAdmin])

    const DropdownMenu = (
        <Menu>
            <Menu.Item key={'1'}>
                {/* eslint-disable-next-line */}
                <a>Settings</a>
            </Menu.Item>
            <Menu.Item key={'2'}>
                <Link to="/" onClick={logout}>
                    Logout
                </Link>
            </Menu.Item>
        </Menu>
    )

    return (
        <Layout>
            <Sider
                style={{
                    overflow: 'auto',
                    height: '100vh',
                    position: 'fixed',
                    left: 0,
                }}
            >
                <div
                    style={{
                        height: '32px',
                        margin: '16px',
                        background: 'rgba(255, 255, 255, 0.2)',
                    }}
                ></div>
                <Menu
                    theme="dark"
                    mode="inline"
                    selectedKeys={useLocation().pathname}
                >
                    {linkList.map((i) => (
                        <Menu.Item key={i.path}>
                            <Link to={i.path}>{i.to}</Link>
                        </Menu.Item>
                    ))}
                </Menu>
            </Sider>
            <Layout style={{ marginLeft: 150 }}>
                <Header
                    style={{
                        padding: 0,
                        paddingRight: 10,
                        background: 'white',
                        display: 'flex',
                        flexDirection: 'row-reverse',
                    }}
                >
                    <div>
                        <Dropdown overlay={DropdownMenu} trigger={['click']}>
                            {/* eslint-disable-next-line */}
                            <a onClick={(e) => e.preventDefault()}>
                                <i className="fas fa-caret-down"></i>
                            </a>
                        </Dropdown>
                    </div>
                </Header>
                <Content
                    style={{
                        margin: '24px 0 0 50px',
                        minHeight: '90vh',
                    }}
                >
                    <div>{component}</div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>
                    School management © 2021 created by TVK
                </Footer>
            </Layout>
        </Layout>
    )
}