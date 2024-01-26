import React, { useState } from 'react'
import './StyleComponent.css'
import WordArea from './WordArea';
import Sidebar from './Sidebar';
import ModalComponent from './ModalComponent';
import { Outlet } from 'react-router-dom';


function MainComponent({ showmodal }) {
    const [text, setText] = useState("")
    return (
        <div className='main-container'>
            <Sidebar />
            <Outlet />
            {/* <WordArea /> */}
        </div>
    )
}

export default MainComponent