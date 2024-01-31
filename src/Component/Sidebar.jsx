import React, { useContext, useEffect, useState } from 'react'
import Avatar from '@mui/material/Avatar';
import { Button, IconButton } from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ModeNightIcon from '@mui/icons-material/ModeNight';
import SearchIcon from '@mui/icons-material/Search';
import ChatBox from '../ComponentItem/ChatBox';
import ModalComponent from './ModalComponent';
import { myContext } from './MainComponent';
import axios from 'axios';

function Sidebar() {
    const [users, setUsers] = useState([]);
    const userData = JSON.parse(localStorage.getItem("userData"));

    const { refresh, setRefresh } = useContext(myContext);
    const config = {
        headers: {
            Authorization: `Bearer ${userData.data.token}`,
        },
    };
    useEffect(() => {
        axios.get("http://localhost:5678/chat/", config).then((data) => {
            setUsers(data.data);
            // setRefresh(!refresh);
        });
    }, [
        refresh
    ]);
    const [showModal, setShowModal] = useState(false)
    const handClick = () => {
        setShowModal(true)

    }

    return (

        <div className='side-bar'>
            <div className="side-header">
                <div>
                    <IconButton>
                        <Avatar alt="Remy Sharp" src="https://scontent.fsgn5-3.fna.fbcdn.net/v/t39.30808-6/411522943_373985608348589_889785018101940738_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=efb6e6&_nc_eui2=AeEamTt0rJAFTB6RfoXS4ngnxYyL2_YybPbFjIvb9jJs9pt9zhvp6TRX4bZZNJL476Ruij8pCjz8clb5RsQTbvLj&_nc_ohc=a4wxphwpC7cAX-Y_7Id&_nc_ht=scontent.fsgn5-3.fna&cb_e2o_trans=t&oh=00_AfDA9wMo0eBbIVcTT3TWosffHErD26nEGK5TDEw6AXV28g&oe=65ADAABD" sx={{ width: 48, height: 48 }} />
                    </IconButton>
                </div>
                <div >
                    <IconButton>
                        <PersonAddIcon />
                    </IconButton>
                    <IconButton onClick={handClick}>
                        <GroupAddIcon />
                    </IconButton>
                    <IconButton>
                        <AddCircleIcon />
                    </IconButton>
                    <IconButton>
                        <ModeNightIcon />
                    </IconButton>
                </div>
            </div>
            <div className="side-body">
                <div className="side-search">
                    <SearchIcon />
                    <input placeholder='search' className='search-box' />
                </div>
            </div>
            <div className="side-footer">
                {users.map((item, index) => (
                    <div key={index} className="" onClick={() => {
                        // console.log(users);
                    }}>
                        <ChatBox props={item} />
                    </div>
                ))}
            </div>

            {showModal ? <ModalComponent clockModal={setShowModal} /> : <div></div>}

        </div >

    )
}

export default Sidebar