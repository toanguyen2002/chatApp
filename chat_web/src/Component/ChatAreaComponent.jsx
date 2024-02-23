import React, { createContext, useContext, useEffect, useRef, useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import { Backdrop, Box, Button, CircularProgress, IconButton, Modal, Typography } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import MessageComponent from '../ComponentItem/MessageComponent';
import MyMessageConponent from '../ComponentItem/MessageConponentuser';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { myContext } from './MainComponent';
import { io } from 'socket.io-client';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import VideocamIcon from '@mui/icons-material/Videocam';


const socket = io("http://localhost:5678")
export default function ChatAreaComponent() {
    const [contentMess, setContentMess] = useState("")
    const [mess, setMess] = useState([])
    const { refresh, setRefresh } = useContext(myContext)
    const params = useParams()
    const messageEndRef = useRef(null)
    const userData = JSON.parse(localStorage.getItem("userData"));
    const [loading, setLoading] = useState(false)
    const fileRef = useRef()
    const [imageData, setImageData] = useState([])


    //chạy xuống bottom mỗi khi có tin nhắn mới
    const scrollTobottom = () => {
        messageEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }

    const [chat_id, chat_user] = params.id.split("&");

    //socket chạy tin nhắn tự động
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

    //load mess
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

    }, [chat_id, mess])
    //send mess img -- 
    // lấy file send về be theo bằng formData để tạo 1 file có tên là fileImage
    const sendMessImg = async () => {
        const formData = new FormData();
        formData.append('fileImage', fileRef.current.files[0]);
        // console.log(fileRef.current.files[0]);
        try {
            const respone = await axios.post("http://localhost:5678/message/messImage",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                }

            );

            const dataSend = await axios.post(
                "http://localhost:5678/message/", {
                chatId: chat_id,
                content: respone.data.url,
                typeMess: "image"
            },
                {
                    headers: {
                        Authorization: `Bearer ${userData.data.token}`,
                    }
                }
            )

            socket.emit("new-mes", dataSend.data)

            messageEndRef.current.scrollIntoView({ behavior: 'smooth' })
            setContentMess("")
        } catch (error) {
            console.error("Error uploading image:", error);
        }
    };
    const enterMess = async (e) => {
        if (e.key == "Enter" && mess) {
            try {
                const dataSend = await axios.post(
                    "http://localhost:5678/message/", {
                    chatId: chat_id,
                    content: contentMess,
                    typeMess: "text"
                },
                    {
                        headers: {
                            Authorization: `Bearer ${userData.data.token}`,
                        }
                    }
                )
                socket.emit("new-mes", dataSend.data)
                setContentMess("")

                // messageEndRef.current.scrollIntoView({ behavior: 'smooth' })
            } catch (error) {
                console.log(error);
            }
        }


    }
    const sendMess = async (e) => {
        if (mess) {
            try {
                const dataSend = await axios.post(
                    "http://localhost:5678/message/", {
                    chatId: chat_id,
                    content: contentMess,
                    typeMess: "text"
                },
                    {
                        headers: {
                            Authorization: `Bearer ${userData.data.token}`,
                        }
                    }
                )
                socket.emit("new-mes", dataSend.data)
                setContentMess("")

                // messageEndRef.current.scrollIntoView({ behavior: 'smooth' })
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
                        <VideocamIcon />
                    </IconButton>
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
                    <div className="">
                        <IconButton>
                            <label htmlFor="">
                                <AttachFileIcon />
                                <input multiple type="file" title='' content='' name='imageData' ref={fileRef} onChange={() => sendMessImg()} />
                            </label>
                        </IconButton>
                        <IconButton onClick={sendMess}>
                            <SendIcon />
                        </IconButton>
                    </div>
                </div>
            </div>


        </>
    )
}
