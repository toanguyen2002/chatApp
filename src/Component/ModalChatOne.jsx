import { IconButton } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import ClearIcon from '@mui/icons-material/Clear';
import { myContext } from './MainComponent';
import axios from 'axios';
import ChatBox from '../ComponentItem/ChatBox';
import { io } from 'socket.io-client';
import { useNavigate } from 'react-router-dom';
function ModalChatOne({ clockModal }) {
    const navigate = useNavigate()
    const [users, setUsers] = useState([]);
    const [nameGroup, setNameGroup] = useState("")

    const userData = JSON.parse(localStorage.getItem("userData"));
    const { refresh, setRefresh } = useContext(myContext);
    const socket = io("http://localhost:5678")
    const accessChatOneToOne = async (item) => {
        // http://localhost:5678/chat/

        try {
            const respone = await axios.post(
                "http://localhost:5678/chat/", {
                userId: item._id,
            }, {
                headers: {
                    Authorization: `Bearer ${userData.data.token}`,
                }
            }
            )
            navigate("chat/" + respone.data._id + "&" + respone.data.users[1].name)
            setRefresh(!refresh)
            console.log(respone.data);

        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        socket.on("connect", () => {
            socket.on("disconnect", () => {
                // console.log(`Socket disconnected: ${socket.id}`);
            });

        })
    }, [])

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
                <h3>Kết Nối</h3>
                <IconButton onClick={() => clockModal(false)}>
                    <ClearIcon />
                </IconButton>
            </div>
            <div className="model-header">
                {/* <input placeholder='Nhập Tên Nhóm' onChange={(e) => setNameGroup(e.target.value)} /> */}
                <input name='search' placeholder='nhập tên người dùng' />
            </div>
            <div className="model-body">
                {users.map((item, index) => (
                    <div
                        key={index} className='modal-chat-box'
                        onClick={() => accessChatOneToOne(item)}>
                        <p className='chat-icon'>{item.name[0]}</p>
                        <p className='chat-name'>{item.name}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ModalChatOne