import React from 'react'

function MessageComponent() {
    const mess = {
        name: "Võ Toàn",
        message: "Alo Alo 1234",

    }
    return (
        <div className='message-container'>
            <p className='chat-icon'>{mess.name[0]}</p>
            <div className='text-content'>
                <p className='chat-name'>{mess.name}</p>
                <p className='chat-title'>{mess.message}</p>
                <p className="chat-row-time">
                    12.am
                </p>
            </div>

        </div>
    )
}

export default MessageComponent