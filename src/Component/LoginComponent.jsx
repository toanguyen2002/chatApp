import { Backdrop, CircularProgress } from '@mui/material'
import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function LoginComponent() {
    const nav = useNavigate()
    const [data, setData] = useState({ name: "", password: "" })
    const [loading, setLoading] = useState(false)
    const dataHandle = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }
    const loginUser = async () => {
        try {
            setLoading(true)
            const respone = await axios.post(
                "http://localhost:5678/user/login",
                data,
                {
                    headers: { "Content-type": "application/json" }
                }
            )
            setLoading(false)
            nav('app/welcome')
        } catch (error) {

        }
    }

    return (
        <>
            <Backdrop open={loading}
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <div className='login-container'>
                <div className="login-container-left">
                    <img width={300} height={300} src="https://inducdung.vn/wp-content/uploads/2020/11/Logo-don-gian-1.jpg" alt="" />
                </div>
                <div className="login-container-right">
                    <div className="login-form-container">
                        <div className="login-form-header">
                            <p>Đăng Nhập</p>
                        </div>
                        <div className="login-form-body">
                            <input className='txtLogin' name='name' placeholder='username' type='text' onChange={dataHandle} />
                            <input className='txtLogin' name='password' placeholder='password' type='password' onChange={dataHandle} />
                            <button onClick={loginUser} className='btn-login'>LOGIN</button>
                            <div className="login-link">
                                <a href='#' className='form-link'>Quên mật khẩu</a>
                                <a href='/register' className='form-link'>Chưa có tài khoản</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}

export default LoginComponent