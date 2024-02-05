import React, { createContext, useContext, useEffect, useRef, useState } from 'react'
import ChatBox from '../ComponentItem/ChatBox'
import DeleteIcon from '@mui/icons-material/Delete';
import { Backdrop, CircularProgress, IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import MessageComponent from '../ComponentItem/MessageComponent';
import MyMessageConponent from '../ComponentItem/MessageConponentuser';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { myContext } from './MainComponent';
import { io } from 'socket.io-client';
const socket = io("http://localhost:5678")
export default function ChatAreaComponent() {
    const [contentMess, setContentMess] = useState("")
    const [mess, setMess] = useState([])
    const { refresh, setRefresh } = useContext(myContext)
    const params = useParams()
    const messageEndRef = useRef(null)
    const userData = JSON.parse(localStorage.getItem("userData"));
    const [loading, setLoading] = useState(false)
    const scrollTobottom = () => {
        messageEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }

    const [chat_id, chat_user] = params.id.split("&");

    useEffect(() => {
        socket.on("mess-rcv", (data) => {
            console.log("mess", data);
            setMess([...mess], data)
        })
    }, [])


    //ket noi socket
    useEffect(() => {

        socket.emit("setup", userData)
        socket.on("connect", () => {
            socket.on("disconnect", () => {
                console.log("mess", socket);
                console.log(`Socket disconnected: ${socket.id}`);
            });
        })
    }, [])

    const rerenderMessage = async () => {

        try {
            // setLoading(true)
            const dataMessage = await axios.get(`http://localhost:5678/message/${chat_id}`, {
                headers: {
                    Authorization: `Bearer ${userData.data.token}`,
                }
            })
            setMess([])
            setMess(dataMessage.data)
            scrollTobottom()
            // setLoading(false)
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {

        rerenderMessage()

    }, [chat_id, refresh, userData.data._id, mess])
    const sendMess = async () => {
        const dataSend = await axios.post(
            "http://localhost:5678/message/", {
            chatId: chat_id,
            content: contentMess
        },
            {
                headers: {
                    Authorization: `Bearer ${userData.data.token}`,
                }
            }
        )
            .then(({ data }) => {
                setRefresh(!refresh)
                setContentMess("")
                socket.emit("new-mes", data)
                messageEndRef.current.scrollIntoView({ behavior: 'smooth' })
            }).catch((error) => {
                console.log(error);
            })

    }
    const enterMess = async (e) => {
        if (e.key == "Enter" && mess) {

            try {
                const dataSend = await axios.post(
                    "http://localhost:5678/message/", {
                    chatId: chat_id,
                    content: contentMess
                },
                    {
                        headers: {
                            Authorization: `Bearer ${userData.data.token}`,
                        }
                    }
                )
                setRefresh(!refresh)
                setContentMess("")
                socket.emit("new-mes", dataSend.data)
                messageEndRef.current.scrollIntoView({ behavior: 'smooth' })
            } catch (error) {
                console.log(error);
            }
        }


    }

    return (
        <><Backdrop open={loading}
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        >
            <CircularProgress color="inherit" />
        </Backdrop>
            <div className='chat-area'>
                <div className="chat-area-header">
                    <p className='chat-icon'>{chat_user[0]}</p>
                    <div className="chat-area-text">
                        <p className='chat-name'>{chat_user}</p>
                        {/* <p className='chat-time'>{data.timeSend}</p> */}
                    </div>
                    <IconButton onClick={() => console.log(chat_id)}>
                        <DeleteIcon />
                    </IconButton>
                </div>
                <div className="chat-area-body" >
                    {mess.map((item, index) => {
                        if (item.sender._id != userData.data._id) {
                            return <MessageComponent props={item} key={index} />

                        }
                        else
                            return <MyMessageConponent props={item} key={index} />

                    })}
                    {/* <div>a</div> */}
                    <div className="" ref={messageEndRef}></div>
                </div>

                {/* <div className="" ref={messageEndRef}></div> */}
                <div className="chat-area-footer">
                    <input onKeyDown={enterMess} placeholder='Enter Message....' className='box-input' onChange={(e) => setContentMess(e.target.value)} value={contentMess} />
                    <IconButton onClick={sendMess}>
                        <SendIcon />
                    </IconButton>
                </div>
            </div></>
    )
}
