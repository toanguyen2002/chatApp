import { IconButton } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import ClearIcon from '@mui/icons-material/Clear';
import axios from 'axios';
import UserComponent from '../ComponentItem/UserComponent';
import { myContext } from './MainComponent';

function FindAndAddFriendComponent({ closemodal }) {
    const [users, setUsers] = useState([])
    const userData = JSON.parse(localStorage.getItem("userData"));
    const [nameUser, setNameUser] = useState('')
    const { refresh, setRefresh } = useContext(myContext);
    useEffect(() => {
        const getUser = async () => {
            const dataUser = await axios.get(`http://localhost:5678/user/fetchUsers?search=${nameUser}`, {
                headers: {
                    Authorization: `Bearer ${userData.data.token}`,
                },
            })
            setUsers(dataUser.data);
        }
        getUser()
    }, [
        refresh
    ]);
    return (
        <div>
            <div className="get-users-modal">
                <div className="modal-title">
                    <h3>Những Người Bạn Có Thể Biết</h3>
                    <IconButton onClick={() => closemodal(false)}>
                        <ClearIcon />
                    </IconButton>
                </div>
                <div className="list-body">
                    {users.map((item, index) => (
                        <div className="">
                            <UserComponent props={item} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default FindAndAddFriendComponent