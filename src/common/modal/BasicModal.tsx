import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import {ReactNode} from "react";
import s from './BasicModal.module.css'

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #366EFF',
    boxShadow: 24,
    p: 4,
};

type BasicModalType = {
    children: (handleClose: () => void) => ReactNode
    childrenBtn: ReactNode
    name: string
}


export const BasicModal = ({children, childrenBtn, name}: BasicModalType) => {

    const [open, setOpen] = React.useState(false)

    const handleClose = () => {
        setOpen(false)
    }

    // const handleOpen = () => {
    //     setOpen(true)
    // }

    return (
        <div>
            <div onClick={() => setOpen(true)}>
                {childrenBtn}
            </div>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div className={s.headerModal}>
                        {name}
                        <CloseIcon style={{cursor: 'pointer'}} onClick={handleClose}/>
                    </div>
                    {children(handleClose)}
                </Box>
            </Modal>
        </div>
    );
}