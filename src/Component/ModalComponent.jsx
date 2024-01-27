import { IconButton } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import ClearIcon from '@mui/icons-material/Clear';
import { myContext } from './MainComponent';
import axios from 'axios';
import ChatBox from '../ComponentItem/ChatBox';
function ModalComponent({ clockModal }) {
    const [users, setUsers] = useState([]);
    const userData = JSON.parse(localStorage.getItem("userData"));
    const { refresh, setRefresh } = useContext(myContext);
    useEffect(() => {
        console.log("Users refreshed");

        const config = {
            headers: {
                Authorization: `Bearer ${userData.data.token}`,
            },
        };
        axios.get("http://localhost:5678/user/fetchUsers", config).then((data) => {
            console.log("UData refreshed in Users panel ");
            console.log(userData.data);
            setUsers(data.data);
            // setRefresh(!refresh);
        });
    }, [
        refresh
    ]);
    return (
        <div className='modal-container'>
            <div className="modal-title">
                <h3>Tạo Nhóm</h3>
                <IconButton onClick={() => clockModal(false)}>
                    <ClearIcon />
                </IconButton>
            </div>
            <div className="model-header">
                <input placeholder='Nhập Tên Nhóm' />
                <input name='search' placeholder='nhập tên người dùng' />
            </div>
            <div className="model-body">
                {users.map((item, index) => (
                    <div key={index} className='modal-chat-box'>
                        <ChatBox props={item} />
                        <input type='checkbox' value={item._id} />
                    </div>
                ))}
            </div>
            <div className="model-footer">
                <div className="model-btn">

                    <div className="btn-create">
                        <IconButton>
                            Tạo Nhóm
                        </IconButton>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalComponent