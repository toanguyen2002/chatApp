import React from 'react'

function MyMessageConponent({ props }) {
    return (
        <div className='my-message'>
            <div className="my-message-row">
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

export default MyMessageConponent