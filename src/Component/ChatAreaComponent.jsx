import React from 'react'
import ChatBox from '../ComponentItem/ChatBox'
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import MessageComponent from '../ComponentItem/MessageComponent';
import MyMessageConponent from '../ComponentItem/MessageConponentuser';

export default function ChatAreaComponent() {
    const data = {
        name: "Test 1",
        lastMess: "last mess",
        timeSend: "today"
    }

    return (
        <div className='chat-area'>
            <div className="chat-area-header">
                <p className='chat-icon'>{data.name[0]}</p>
                <div className="chat-area-text">
                    <p className='chat-name'>{data.name}</p>
                    <p className='chat-time'>{data.timeSend}</p>
                </div>
                <IconButton>
                    <DeleteIcon />
                </IconButton>
            </div>
            <div className="chat-area-body">
                <MessageComponent />
                <MyMessageConponent />
                <MessageComponent />
                <MyMessageConponent />
                <MessageComponent />
                <MyMessageConponent />
                <MessageComponent />
                <MyMessageConponent />
                <MessageComponent />
                <MyMessageConponent />
            </div>
            <div className="chat-area-footer">
                <input placeholder='Enter Message....' className='box-input' />
                <IconButton>
                    <SendIcon />
                </IconButton>
            </div>
        </div>
    )
}
