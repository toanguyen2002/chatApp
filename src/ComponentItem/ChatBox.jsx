import React from 'react'
import { useNavigate } from 'react-router-dom'

function ChatBox({ props }) {
    const nav = useNavigate()
    return (
        <div className='chat-box' onClick={() => nav("chat/" + props._id + "&" + props.chatName)}>
            <p className='chat-icon'>{props.chatName[0]}</p>
            <p className='chat-name'>{props.chatName}</p>
            <p className='chat-title'>{props.lastMessage}</p>
            <p className='chat-time'>{props.timeSend}</p>
        </div>
    )
}

export default ChatBox