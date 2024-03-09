import React from 'react'

function UserComponent({ props }) {
    return (
        // <div>onClick={() => nav("chat/" + props._id + "&" + props.chatName)
        <div className='user-box' >
            <p className='chat-icon'>{props.name[0]}</p>
            <p className='chat-name'>{props.name}</p>
            <div className="btn-group">
                <button className='btn-style'>Thêm Bạn Bè</button>
            </div>
        </div>
    )
}

export default UserComponent