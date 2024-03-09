import React from 'react'

<<<<<<< HEAD
function UserComponent({ props, clickToAdd }) {
=======
function UserComponent({ props }) {
>>>>>>> main
    return (
        // <div>onClick={() => nav("chat/" + props._id + "&" + props.chatName)
        <div className='user-box' >
            <p className='chat-icon'>{props.name[0]}</p>
            <p className='chat-name'>{props.name}</p>
            <div className="btn-group">
<<<<<<< HEAD
                <button className='btn-style' onClick={() => clickToAdd(props._id)}>Thêm Bạn Bè</button>
=======
                <button className='btn-style'>Thêm Bạn Bè</button>
>>>>>>> main
            </div>
        </div>
    )
}

export default UserComponent