import React, { createContext, useContext, useEffect, useRef, useState } from 'react'
import ChatBox from '../ComponentItem/ChatBox'
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import MessageComponent from '../ComponentItem/MessageComponent';
import MyMessageConponent from '../ComponentItem/MessageConponentuser';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { myContext } from './MainComponent';
import { io } from 'socket.io-client';
// , selectedChatCompare;
var socket
export default function ChatAreaComponent() {
    const [contentMess, setContentMess] = useState("")
    const [socketConnect, setSocketConnect] = useState(false)
    const [mess, setMess] = useState([])
    const { refresh, setRefresh } = useContext(myContext)
    const params = useParams()
    const messageEndRef = useRef(null)
    const userData = JSON.parse(localStorage.getItem("userData"));
    // console.log(params.id);
    const scrollTobottom = () => {
        messageEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
    const [chat_id, chat_user] = params.id.split("&");


    useEffect(() => {
        socket = io("http://localhost:5678")
        socket.on("mess-rcv", (data) => {
            console.log("mess", data);
            setMess([...mess], data)
        })
    }, [])


    // socket.on("connection", (socket) => {
    //     // console.log(socket);
    //     console.log(socket);
    //     socket.emit("demo-run", (client) => {
    //         client.send(userData)
    //     })
    // })


    //ket noi socket
    useEffect(() => {
        socket = io("http://localhost:5678")

        socket.on("connect", () => {
            console.log(socket.connected);
            console.log("mess", socket);
            socket.on("disconnect", () => {
                console.log("mess", socket);
                console.log(`Socket disconnected: ${socket.id}`);
            });
        })
    }, [])

    const rerenderMessage = async () => {
        try {
            const dataMessage = await axios.get(`http://localhost:5678/message/${chat_id}`, {
                headers: {
                    Authorization: `Bearer ${userData.data.token}`,
                }
            })
            setMess(dataMessage.data)
            scrollTobottom()
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        rerenderMessage()
    }, [chat_id, refresh, userData.data._id, mess])
    const sendMess = async () => {
        await axios.post(
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
                messageEndRef.current.scrollIntoView({ behavior: 'smooth' })
            }).catch((error) => {
                console.log(error);
            })

    }


    return (
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
                <input placeholder='Enter Message....' className='box-input' onChange={(e) => setContentMess(e.target.value)} value={contentMess} />
                <IconButton onClick={sendMess}>
                    <SendIcon />
                </IconButton>
            </div>
        </div>
    )
}
