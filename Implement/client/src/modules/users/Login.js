import { Button, Input, Form, message } from 'antd'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { useGlobalContext } from '../../global/GlobalContext'

export default function Login() {
    const { login, setCurrentUser, user, isAdmin } = useGlobalContext()
    console.log(user)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setLoading] = useState(false)

    const handleChangeUsername = (e) => {
        setUsername(e.target.value)
    }

    const handleChangePassword = (e) => {
        setPassword(e.target.value)
    }

    const navigate = useNavigate()

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            setLoading(true)
            const res = await login(username, password)
            if (res) {
                message.success('Login successfully!')
                setCurrentUser(res.data.content.uid)
            } else {
                message.error('Incorrect username or password!')
            }
        } catch (error) {
            message.error('Login failed!')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        const detectLogin = () => {
            if (user || isAdmin) {
                navigate('/')
            }
        }
        return detectLogin()
        // eslint-disable-next-line
    }, [user, isLoading, isAdmin])

    return (
        <LoginContainer>
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                initialValues={{ remember: true }}
                autoComplete="off"
                onSubmitCapture={handleSubmit}
            >
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your username!',
                        },
                    ]}
                >
                    <Input onChange={handleChangeUsername} />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                >
                    <Input.Password onChange={handleChangePassword} />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button
                        type="primary"
                        htmlType="submit"
                        disabled={!(username && password) || isLoading}
                        loading={isLoading}
                    >
                        Login
                    </Button>
                </Form.Item>
            </Form>
        </LoginContainer>
    )
}

const LoginContainer = styled.div`
    width: 400px;
    margin: 100px auto 0 auto;
    padding: 10px;
    padding-top: 40px;
    border: 1px solid #e0e0e0;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
`
