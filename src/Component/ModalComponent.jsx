import { IconButton } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import ClearIcon from '@mui/icons-material/Clear';
import { myContext } from './MainComponent';
import axios from 'axios';
import ChatBox from '../ComponentItem/ChatBox';
function ModalComponent({ clockModal }) {
    const [users, setUsers] = useState([]);
    const [checkboxValues, setCheckboxValues] = useState([]);
    const [nameGroup, setNameGroup] = useState("")

    const userData = JSON.parse(localStorage.getItem("userData"));
    const { refresh, setRefresh } = useContext(myContext);
    const handleCheckboxChange = (event) => {
        const value = event.target.value;
        const isChecked = event.target.checked;

        // Cập nhật mảng checkboxValues dựa trên trạng thái của checkbox
        setCheckboxValues((prevValues) => {
            if (isChecked) {
                return [...prevValues, value]; // Thêm giá trị vào mảng
            } else {
                return prevValues.filter((item) => item !== value); // Loại bỏ giá trị khỏi mảng
            }
        });
    };
    const createGroupChat = async () => {
        console.log(checkboxValues);
        console.log(userData.data.token);

        await axios.post("http://localhost:5678/chat/createGroupChat",
            JSON.stringify({
                name: nameGroup,
                users: JSON.stringify(checkboxValues)
            }),
            {
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    Authorization: `Bearer ${userData.data.token}`,
                },
            }).then(() => {
                setRefresh(!refresh);
            })
            .then(() => {
                clockModal(false)
            })
            .catch((error) => {
                console.log(error);
            })

    };


    useEffect(() => {
        console.log("Users refreshed");
        const config = {
            headers: {
                Authorization: `Bearer ${userData.data.token}`,
            },
        };
        axios.get("http://localhost:5678/user/fetchUsers", {
            headers: {
                Authorization: `Bearer ${userData.data.token}`,
            },
        }).then((data) => {
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
                <input placeholder='Nhập Tên Nhóm' onChange={(e) => setNameGroup(e.target.value)} />
                <input name='search' placeholder='nhập tên người dùng' />
            </div>
            <div className="model-body">
                {users.map((item, index) => (
                    <div
                        key={index} className='modal-chat-box'>
                        <p className='chat-icon'>{item.name[0]}</p>
                        <p className='chat-name'>{item.name}</p>
                        <input type='checkbox' value={item._id} onChange={handleCheckboxChange} />
                    </div>
                ))}
            </div>
            <div className="model-footer">
                <div className="model-btn">
                    <div className="btn-create">
                        <IconButton onClick={createGroupChat}>
                            Tạo Nhóm
                        </IconButton>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalComponent