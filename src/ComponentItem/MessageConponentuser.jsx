import React from 'react'

function MyMessageConponent() {
    const mess = {
        name: "Toán Nguyễn",
        message: "Nguyễn Quang Toán",

    }
    return (
        <div className='my-message'>
            <div className="my-message-row">
                <div className='text-content'>
                    <p className='chat-title'>{mess.message}</p>
                </div>
                <p className="chat-row-time">
                    12.am
                </p>
            </div>
        </div>
    )
}

export default MyMessageConponent