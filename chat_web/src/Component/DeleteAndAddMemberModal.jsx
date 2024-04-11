import { IconButton } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import ClearIcon from '@mui/icons-material/Clear';


function DeleteAndAddMemberModal({ closemodal }) {

    const [users, setUsers] = useState([])
    
    return (
        <div>

            <div className="get-users-modal2">
                <div className="modal-title">
                    <h3 className='fr-cap3'>Danh Sách Thành Viên</h3>
                    <IconButton onClick={() => closemodal(false)}>
                        <ClearIcon className='icon4'/>
                    </IconButton>
                </div>
                <div className="list-body">
                    {/* data */}
                </div>
            </div>
        </div>
    )
}


export default DeleteAndAddMemberModal