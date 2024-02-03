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
import { io } from 'socket.io-client';
import { useParams } from 'react-router-dom';
import ModalChatOne from './ModalChatOne';

var socket
function Sidebar() {
    const [users, setUsers] = useState([]);
    const userData = JSON.parse(localStorage.getItem("userData"));
    const { refresh, setRefresh } = useContext(myContext);
    const [showModal, setShowModal] = useState(false)
    const [showOne, setShowOne] = useState(false)

    const [search, setSearch] = useState("")
    // useEffect(() => {
    //     // http://localhost:5678/user/fetchUsers?search=toanguyen

    // }, [])
    useEffect(() => {
        //http://localhost:5678/chat/findChatByName?chatName=Toan
        const getChat = async () => {
            try {
                const chatData = await axios.get(`http://localhost:5678/chat/findChatByName?chatName=${search}`, {
                    headers: {
                        Authorization: `Bearer ${userData.data.token}`,
                    }
                })
                setUsers(chatData.data)
                // console.log(chatData.data)
            } catch (error) {

            }

        }
        getChat()
    }, [search])
    useEffect(() => {
        socket = io("http://localhost:5678")
        socket.on("connect", () => {
            console.log("sidebar: ", socket);
            socket.on("group-rcv", (data) => {
                console.log("sidebar: ", socket.connected);
                console.log([...users], data);
                setUsers([...users], data)
            })
        })


    }, [
        refresh, users, userData.data._id,])

    useEffect(() => {

        axios.get("http://localhost:5678/chat/", {
            headers: {
                Authorization: `Bearer ${userData.data.token}`,
            },
        })
            .then((data) => {
                setUsers(data.data);
            });
    }, [
        refresh, userData.data.token
    ]);
    // useEffect(() => {
    //     socket.on("connect", () => {
    //         socket.on("disconnect", () => {
    //             console.log(`Socket disconnected: ${socket.id}`);
    //         });
    //     })
    // }, [
    //     refresh, users, userData.data._id,])

    const handClick = () => {
        setShowModal(true)

    }
    const handClickOne = () => {
        setShowOne(true)
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
                    <IconButton onClick={handClickOne}>
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
                    <input placeholder='search' className='search-box' onChange={e => setSearch(e.target.value)} />
                </div>
            </div>
            <div className="side-footer">
                {users.map((item, index) => {
                    if (item.isGroup == false) {
                        item.chatName = item.users[1].name
                        console.log(item.users[1].name);
                    }
                    return (<div key={index} className="" onClick={() => {
                        console.log(item.isGroup);
                    }}>

                        <ChatBox props={item} />

                    </div>)
                }
                )}
            </div>

            {showModal ? <ModalComponent clockModal={setShowModal} /> : <div></div>}
            {showOne ? <ModalChatOne clockModal={setShowOne} /> : <div></div>}

        </div >

    )
}

export default Sidebar