import { IconButton } from '@mui/material'
import React from 'react'
import ClearIcon from '@mui/icons-material/Clear';
function ModalComponent({ clockModal }) {

    return (
        <div className='modal-container'>
            <div className="modal-title">
                <h3>Tạo Nhóm</h3>
                <IconButton onClick={() => clockModal(false)}>
                    <ClearIcon />
                </IconButton>
            </div>
            <div className="model-header">
                <input placeholder='Nhập Tên Nhóm' />
                <input placeholder='nhập tên người dùng' />
            </div>
            <div className="model-body">body</div>
            <div className="model-footer">
                <div className="model-btn">

                    <div className="btn-create">
                        <IconButton>
                            Tạo Nhóm
                        </IconButton>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalComponent