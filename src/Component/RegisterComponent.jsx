import { Backdrop, CircularProgress } from '@mui/material'
import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function RegisterComponent() {
    const [data, setData] = useState({ name: "", email: "", password: "" })
    const [signInText, setSignInText] = useState("")
    const [loading, setLoading] = useState(false)
    const nav = useNavigate()
    const dataHandle = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
        console.log(data);
    }
    const registerHandle = async () => {
        try {
            setLoading(true)
            const respone = await axios.post(
                "http://localhost:5678/user/register",
                data,
                {
                    headers: { "Content-type": "application/json" }
                }
            )
            console.log(respone);

            localStorage.setItem("userData", JSON.stringify(respone))
            setSignInText({ msg: " success", key: Math.random() })
            setLoading(false)
            nav('/app/welcome')
        } catch (error) {
            console.log(error);
        }


    }
    return (
        <>
            <Backdrop open={loading}
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            < div className='login-container' >
                <div className="login-container-left">
                    <img width={300} height={300} src="https://inducdung.vn/wp-content/uploads/2020/11/Logo-don-gian-1.jpg" alt="" />
                </div>
                <div className="login-container-right">
                    <div className="login-form-container">
                        <div className="login-form-header">
                            <p>Đăng Ký</p>
                        </div>
                        <div className="login-form-body">
                            <input className='txtLogin' name='name' placeholder='username' type='text' onChange={dataHandle} />
                            <input className='txtLogin' name='password' placeholder='password' type='password' onChange={dataHandle} />
                            <input className='txtLogin' name='email' placeholder='Email' type='email' onChange={dataHandle} />
                            <button onClick={registerHandle} className='btn-login'>Đăng Ký</button>
                            <div className="login-link">
                                <a href='/' className='form-link'>Đã có tài khoản</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </>

    )
}

export default RegisterComponent