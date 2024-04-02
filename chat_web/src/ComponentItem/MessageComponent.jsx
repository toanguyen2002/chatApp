import React, { useRef } from 'react'

function MessageComponent({ props }) {
    const refBox = useRef(null)
    const renderContent = () => {
        if (props.typeMess === 'text') {
            return (
                <div className='text-content'>
                    <p className='chat-title'>{props.content}</p>
                </div>
            );
        }
        else {
            return (
                <div className='img-box' ref={refBox}>
                    {props.ImageUrl.map((item) => (
                        <div className="">
                            {item.url.endsWith('docx') &&
                                <div className="">
                                    <a href={item.url}>{item.url.split('/')[3]}</a>
                                    <br />
                                </div>
                            }
                            {item.url.endsWith('xlsx') &&
                                <div className="">
                                    <a href={item.url}>{item.url.split('/')[3]}</a> <br />
                                </div>
                            }
                            {item.url.endsWith('pptx') &&
                                <div className="">
                                    <a href={item.url}>{item.url.split('/')[3]}</a> <br />
                                </div>
                            }
                            {item.url.endsWith('pdf') &&
                                <div className="">
                                    <a href={item.url}>{item.url.split('/')[3]}</a> <br />
                                </div>
                            }
                            {item.url.endsWith('png') &&
                                // <h1 className="">png</h1>
                                <img className='img-chat' style={{ maxWidth: `400px` }} src={item.url} alt="" />
                            }
                            {item.url.endsWith('jpg') &&
                                // <h1 className="">png</h1>
                                <img className='img-chat' style={{ maxWidth: `400px` }} src={item.url} alt="" />
                            }
                            {item.url.endsWith('jpeg') &&
                                // <h1 className="">jpeg</h1>
                                <img className='img-chat' style={{ width: `200px` }} src={item.url} alt="" />
                            }
                        </div>
                    ))}
                </div>
            );
        }
    };
    return (
        <div className='message-container'>
            <p className='chat-icon'>{props.sender.name[0]}</p>
            <div className='text-content'>
                <p className='chat-name'>{props.sender.name}</p>
                {renderContent()}
            </div>

        </div >
    )
}

export default MessageComponent