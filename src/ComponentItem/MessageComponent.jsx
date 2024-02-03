import React from 'react'

function MessageComponent({ props }) {
    const mess = {
        name: "Võ Toàn",
        message: "Alo Alo 1234",

    }
    return (
        <div className='message-container'>
            <p className='chat-icon'>{props.sender.name[0]}</p>
            <div className='text-content'>
                <p className='chat-name'>{props.sender.name}</p>
                <p className='chat-title'>{props.content}</p>
                {/* <p className="chat-row-time">
                    12.am
                </p> */}
            </div>

        </div>
    )
}

export default MessageComponent