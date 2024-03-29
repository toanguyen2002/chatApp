import React from 'react'

function MessageComponent({ props }) {
    return (
        <div className='message-container'>
            <p className='chat-icon'>{props.sender.name[0]}</p>
            <div className='text-content'>
                <p className='chat-name'>{props.sender.name}</p>
                <div className='text-content'>
                    {
                        props.typeMess == 'text' ? <p className='chat-title'>{props.content}</p> :
                            <img className='img-chat' src={props.content} alt="" />
                    }
                </div>
            </div>

        </div>
    )
}

export default MessageComponent