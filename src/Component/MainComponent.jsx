import React, { createContext, useState } from 'react'
import './StyleComponent.css'
import WordArea from './WordArea';
import Sidebar from './Sidebar';
import ModalComponent from './ModalComponent';
import { Outlet } from 'react-router-dom';

export const myContext = createContext()
function MainComponent({ showmodal }) {
    const [text, setText] = useState("")
    const [refresh, setRefresh] = useState(true);
    return (

        <div className='main-container'>
            <myContext.Provider value={{ refresh: refresh, setRefresh: setRefresh }}>
                <Sidebar />
                <Outlet />
            </myContext.Provider>

            {/* <WordArea /> */}
        </div>
    )
}

export default MainComponent