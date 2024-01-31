import React, { createContext, useContext, useEffect, useState } from 'react'
import ChatBox from '../ComponentItem/ChatBox'
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import MessageComponent from '../ComponentItem/MessageComponent';
import MyMessageConponent from '../ComponentItem/MessageConponentuser';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { myContext } from './MainComponent';

export default function ChatAreaComponent() {
    const data = {
        chatName: "Test 1",
    }
    const [mess, setMess] = useState([])
    const { refresh, setRefresh } = useContext(myContext)
    const params = useParams()
    // console.log(params.id);
    const [chat_id, chat_user] = params.id.split("&");
    // console.log(chat_id);


    useEffect(() => {
        const rerenderMessage = async () => {
            const dataMessage = await axios.get(`http://localhost:5678/message/${chat_id}`)
            setMess(dataMessage.data)
        }
        rerenderMessage()
        console.log("mes", mess);
    }, [chat_id, refresh])

    const sendMess = async () => {
        console.log(1);
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
            <div className="chat-area-body">
                <MessageComponent />
                <MyMessageConponent />
            </div>
            <div className="chat-area-footer">
                <input placeholder='Enter Message....' className='box-input' />
                <IconButton onClick={sendMess}>
                    <SendIcon />
                </IconButton>
            </div>
        </div>
    )
}
