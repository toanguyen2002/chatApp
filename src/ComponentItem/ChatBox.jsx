import React from 'react'
import { useNavigate } from 'react-router-dom'

function ChatBox({ props }) {
    const nav = useNavigate()
    return (
        <div className='chat-box' onClick={() => nav("chat")}>
            <p className='chat-icon'>{props.name[0]}</p>
            <p className='chat-name'>{props.name}</p>
            <p className='chat-title'>{props.lastMess}</p>
            <p className='chat-time'>{props.timeSend}</p>
        </div>
    )
}

export default ChatBox