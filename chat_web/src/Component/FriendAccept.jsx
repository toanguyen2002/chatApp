import { IconButton } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import ClearIcon from '@mui/icons-material/Clear';
import axios from 'axios';
import UserComponent from '../ComponentItem/UserComponent';
import { myContext } from './MainComponent';

function FriendAccept({ closemodal }) {

    
    return (
        <div>

            <div className="get-users-modal">
                <div className="modal-title">
                    <h3 className='fr-cap2'>Lời Mời Kết Bạn</h3>
                    <IconButton onClick={() => closemodal(false)}>
                        <ClearIcon />
                    </IconButton>
                </div>
                <div className="list-body">
                    {/* data here */}
                </div>
            </div>
        </div>
    )
}


export default FriendAccept