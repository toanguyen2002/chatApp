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
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import Picker from 'emoji-picker-react';


var socket = io("http://localhost:5678")
export default function ChatAreaComponent() {
    const [contentMess, setContentMess] = useState('')
    const [mess, setMess] = useState([])
    const { refresh, setRefresh } = useContext(myContext)
    const params = useParams()
    const messageEndRef = useRef(null)
    const userData = JSON.parse(localStorage.getItem("userData"));
    const [loading, setLoading] = useState(false)
    const [renderMess, setRenderMess] = useState(false)
    const [showFormEmoji, setShowFormEmoji] = useState(false)
    const fileRef = useRef()
    const [imageData, setImageData] = useState([])
    const textRef = useRef()
    const [scrollExecuted, setScrollExecuted] = useState(false);
    const [chat_id, chat_user] = params.id.split("&");
    const [objectChat, setObjectChat] = useState()
    var emojiArray = []
    const selectEmojiIcon = (emojiObject) => {
        const emoji = emojiObject.emoji
        emojiArray.push(emoji)
        setContentMess(...emoji)
    }

    //chạy xuống bottom mỗi khi có tin nhắn mới
    useEffect(() => {
        setObjectChat(chat_id)

    }, [chat_id])

    //ket noi socket
    useEffect(() => {
        socket.emit("setup", userData)
        socket.on("connect", () => {
            // socket.on("disconnect", () => {
            //     console.log("mess", socket);
            //     console.log(`Socket disconnected: ${socket.id}`);
            // });
        })
    }, [])
    const renderChat = async () => {
        try {
            // setLoading(true)
            const dataMessage = await axios.get(`http://localhost:5678/message/${objectChat}`, {
                headers: {
                    Authorization: `Bearer ${userData.data.token}`,
                }
            })
            setTimeout(() => {
                // setMess([])
                setMess(dataMessage.data)
            }, 1000)
        }
        catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        renderChat()
        messageEndRef.current.scrollIntoView({ behavior: "auto", block: "end", inline: "nearest" })
    }, [objectChat, mess, refresh, socket])

    // useEffect(() => {
    //     socket.on("message recieved", (data) => {
    //         // console.log(objectChat === data.chat._id);
    //         if (objectChat === data.chat._id) {
    //             // renderChat()
    //             setMess([...mess, data])
    //             // console.log(1);
    //         } else {
    //             console.log(data);
    //         }
    //     })
    // })



    //send mess img -- 
    // lấy file send về be theo bằng formData để tạo 1 file có tên là fileImage
    const uploadmultiImage = async () => {
        const arrayListImage = Array.from(fileRef.current.files)


        const dataImge = []

        await Promise.all(arrayListImage.map(async (item) => {
            const dataRender = await sendMessImg(item)
            dataImge.push(dataRender)
        }))
        // console.log(dataImge);
        const dataSend = await axios.post(
            "http://localhost:5678/message/", {
            chatId: objectChat,
            ImageUrl: dataImge,
            typeMess: "Multimedia"
        },
            {
                headers: {
                    Authorization: `Bearer ${userData.data.token}`,
                }
            }
        )
        socket.emit("new message", dataSend.data)
        socket.emit("render-box-chat", true)
        setContentMess("")
        setRenderMess(!renderMess)
        setMess([...mess, dataSend.data])
        // messageEndRef.current.scrollIntoView({ behavior: 'smooth' })

    }
    const sendMessImg = async (items) => {
        const formData = new FormData();
        formData.append('fileImage', items);
        try {

            const respone = await axios.post("http://localhost:5678/message/messImage",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                }

            );

            return respone.data
        } catch (error) {
            console.error("Error uploading image:", error);
        }

    };
    const enterMess = async (e) => {
        if (e.key == "Enter" && contentMess) {
            try {
                const dataSend = await axios.post(
                    "http://localhost:5678/message/", {
                    chatId: objectChat,
                    content: contentMess,
                    typeMess: "text"
                },
                    {
                        headers: {
                            Authorization: `Bearer ${userData.data.token}`,
                        }
                    }
                )
                socket.emit("new message", dataSend.data)
                socket.emit("render-box-chat", true)

                setMess([...mess, dataSend.data])
                setContentMess("")
                setRenderMess(!renderMess)
            } catch (error) {
                console.log(error);
            }
        }


    }
    const sendMess = async () => {
        if (contentMess) {
            // console.log(true);
            try {
                const dataSend = await axios.post(
                    "http://localhost:5678/message/", {
                    chatId: objectChat,
                    content: contentMess,
                    typeMess: "text"
                },
                    {
                        headers: {
                            Authorization: `Bearer ${userData.data.token}`,
                        }
                    }
                )
                socket.emit("new message", dataSend.data)
                socket.emit("render-box-chat", true)

                setMess([...mess, dataSend.data])
                setRenderMess(!renderMess)
                setContentMess("")
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
                        <div className="online">online</div>
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
                    <div className="" ref={messageEndRef}></div>
                </div>

                {/* <div className="" ref={messageEndRef}></div> */}

                <div className='emoji-form'>
                    {/* {contentMess ? (
                        <span>You chose: {contentMess.emoji}</span>
                    ) : (
                        <span>No emoji Chosen</span>
                    )} */}
                    <Picker open={showFormEmoji} onEmojiClick={selectEmojiIcon} />
                </div>
                <div className="chat-area-footer">
                    <input onFocus={() => { messageEndRef.current.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" }); }} onKeyDown={enterMess} ref={textRef} placeholder='Enter Message....' className='box-input' onChange={(e) => setContentMess(e.target.value)} value={contentMess} />
                    <div className="">
                        <IconButton onClick={() => setShowFormEmoji(!showFormEmoji)}>
                            <EmojiEmotionsIcon />
                        </IconButton>
                        <IconButton>
                            <label htmlFor="">
                                <AttachFileIcon />
                                <input multiple type="file" title='' content='' name='imageData' ref={fileRef} onChange={() => uploadmultiImage()} />
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
