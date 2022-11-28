import React, {useEffect, useRef, useState} from 'react';
import style from './NamePack.module.css';
import {Button} from '@mui/material';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import DriveFileRenameOutlineOutlinedIcon from '@mui/icons-material/DriveFileRenameOutlineOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import {useAppDispatch, useAppSelector} from '../../../../hooks/hooks';
import {AddCardTC, setCardsTC} from '../../CardsReducer';
import {DeletePackTC, SetCardsPackTC, UpdatePackTC} from '../../../packsPage/PacksReducer';
import {RequestUpdatePackType} from '../../../packsPage/PacksAPI';
import {useNavigate, useSearchParams} from 'react-router-dom';
import {packsRoute} from '../../../../common/paths/Paths';


export const NamePack = () => {

    //const navigate = useNavigate()
    const [open, setOpen] = useState(false);
    const dispatch = useAppDispatch()
    const anchorRef = useRef<HTMLHeadingElement>(null);
    const packName = useAppSelector(state => state.Cards.packName)
    const cardsPack_id = useAppSelector(state => state.Cards.cardsPack_id)
    const packsUserId = useAppSelector(state => state.Cards.packUserId)
    const myId = useAppSelector(state => state.ProfilePage.user_id)




    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };
    const handleClose = (event: Event | React.SyntheticEvent) => {
        if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
            return;
        }
        setOpen(false);
    };

    function handleListKeyDown(event: React.KeyboardEvent) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        } else if (event.key === 'Escape') {
            setOpen(false);
        }
    }

    const prevOpen = useRef(open);
    useEffect(() => {
        if (prevOpen.current && !open) {
            anchorRef.current!.focus();
        }
        prevOpen.current = open;
    }, [open]);

    const createNewCard = () => {
        {
            cardsPack_id &&
            dispatch(AddCardTC({cardsPack_id: cardsPack_id, question: 'Who is John Galt', answer: 'Good boy'}))
        }
    }

    const updatePackClick = (cards_pack: RequestUpdatePackType) => {
        dispatch(UpdatePackTC(cards_pack))
    }
    const deletePackClick = (pack_id: string) => {
        dispatch(DeletePackTC(pack_id))
    }

    if (!cardsPack_id) {
        return <></>
    }
    return (
        <div className={style.name_pack_all_wrapper}>
            <h2
                ref={anchorRef}
                id="composition-button"
                aria-controls={open ? 'composition-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleToggle}
                className={style.title_my_cards}>
                {packName}
            </h2>
            {packsUserId === myId &&
                <Popper
                    open={open}
                    anchorEl={anchorRef.current}
                    role={undefined}
                    placement="bottom-start"
                    transition
                    disablePortal
                    className={style.popper}
                >
                    {({TransitionProps, placement}) => (
                        <Grow
                            {...TransitionProps}
                            style={{
                                transformOrigin:
                                    placement === 'bottom-start' ? 'left top' : 'left bottom',
                            }}
                        >
                            <Paper>
                                <ClickAwayListener onClickAway={handleClose}>
                                    <MenuList
                                        autoFocusItem={open}
                                        id="composition-menu"
                                        aria-labelledby="composition-button"
                                        onKeyDown={handleListKeyDown}
                                    >
                                        <MenuItem onClick={handleClose}>
                                            <div className={style.icon_action}>
                                                <SchoolOutlinedIcon/>
                                                <div className={style.name_icon}>Learn</div>
                                            </div>
                                        </MenuItem>
                                        <MenuItem onClick={handleClose}>
                                            <div className={style.icon_action}
                                                 onClick={() => updatePackClick(
                                                     {
                                                         _id: cardsPack_id,
                                                         name: 'Hey New Pack Name'
                                                     }
                                                 )}>
                                                <DriveFileRenameOutlineOutlinedIcon/>
                                                <div className={style.name_icon}>Edit</div>
                                            </div>
                                        </MenuItem>
                                        <MenuItem onClick={handleClose}>
                                            <div className={style.icon_action}
                                                 onClick={() => deletePackClick(cardsPack_id)}>
                                                <DeleteForeverOutlinedIcon/>
                                                <div className={style.name_icon}>Delete</div>
                                            </div>
                                        </MenuItem>
                                    </MenuList>
                                </ClickAwayListener>
                            </Paper>
                        </Grow>
                    )}
                </Popper>
            }
            {
                packsUserId === myId
                    ?
                    <Button className={style.button} variant="outlined" type="submit" onClick={createNewCard}>
                        Add new card
                    </Button>
                    :
                    <Button className={style.button} variant="outlined" type="submit">
                        Learn to pack
                    </Button>
            }
        </div>
    );
};

