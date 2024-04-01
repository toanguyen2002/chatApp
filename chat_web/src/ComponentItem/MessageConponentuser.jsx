import React, { useRef } from 'react'

function MyMessageConponent({ props }) {
    const refBox = useRef(null)
    console.log(props.ImageUrl.length / refBox.current.getBoundingClientRect().width * 100);
    return (
        <div className='my-message'>
            <div className="my-message-row">
                {
                    props.typeMess == 'text' ?
                        <div className='text-content'>
                            <p className='chat-title'>{props.content}</p>
                        </div>
                        :
                        <div className='img-box' ref={refBox}>
                            {// <div className="img-box">
                                // ${props.ImageUrl.length * 1000 / refBox.current.getBoundingClientRect().width}
                                props.ImageUrl.map((item) => (
                                    // width: `${refBox.current.width}`
                                    <img className='img-chat' style={{ width: `30%` }} src={item.url} alt="" />
                                ))}
                        </div>

                }
            </div>

        </div>
    )
}

export default MyMessageConponent