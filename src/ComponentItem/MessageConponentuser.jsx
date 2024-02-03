import React from 'react'

function MyMessageConponent({ props }) {
    const mess = {
        name: "Toán Nguyễn",
        message: "Nguyễn Quang Toán",

    }
    return (
        <div className='my-message'>
            <div className="my-message-row">
                <div className='text-content'>
                    <p className='chat-title'>{props.content}</p>
                </div>
                {/* <p className="chat-row-time">
                    12.am
                </p> */}
            </div>
        </div>
    )
}

export default MyMessageConponent