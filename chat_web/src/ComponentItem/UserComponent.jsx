<<<<<<< HEAD
import React from 'react'

function UserComponent({ props, clickToAdd }) {
    return (
        // <div>onClick={() => nav("chat/" + props._id + "&" + props.chatName)
        <div className='user-box' >
            <p className='chat-icon'>{props.name[0]}</p>
            <p className='chat-name'>{props.name}</p>
            <div className="btn-group">
                <button className='btn-style' onClick={() => clickToAdd(props._id)}>Thêm Bạn Bè</button>
            </div>
        </div>
    )
}
=======
import React from 'react'

function UserComponent({ props, clickToAdd }) {
    return (
        // <div>onClick={() => nav("chat/" + props._id + "&" + props.chatName)
        <div className='user-box' >
            <p className='chat-icon'>{props.name[0]}</p>
            <p className='chat-name2'>{props.name}</p>
            <div className="btn-group">
                <button className='btn-style' onClick={() => clickToAdd(props._id)}>Thêm Bạn Bè</button>
            </div>
        </div>
    )
}
>>>>>>> main
export default UserComponent