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
import {setPacksIdAC} from '../../CardsReducer';
import {DeletePackTC, UpdatePackTC} from '../../../packsPage/PacksReducer';
import {RequestUpdatePackType} from '../../../packsPage/PacksAPI';
import {useNavigate} from 'react-router-dom';
import {AddCardModal} from "../cardModal/AddCardModal";
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import {Paths} from "../../../../common/paths/Paths";
import {useAppDispatch, useAppSelector} from "../../../../Redux/Store";

export const NamePack = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const anchorRef = useRef<HTMLHeadingElement>(null);
    const packName = useAppSelector(state => state.Cards.packName)
    const cardsPack_id = useAppSelector(state => state.Cards.cardsPack_id)
    const packsUserId = useAppSelector(state => state.Cards.packUserId)
    const myId = useAppSelector(state => state.ProfilePage.user_id)
    const status = useAppSelector(state => state.App.status)
    const cardsCount = useAppSelector(state => state.Cards.cardsTotalCount)

    const [open, setOpen] = useState(false);
    const prevOpen = useRef(open);

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen)
    };

    const handleClose = (event: Event | React.SyntheticEvent) => {
        if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
            return;
        }
        setOpen(false);
    };

    const handleListKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        } else if (event.key === 'Escape') {
            setOpen(false);
        }
    }


    useEffect(() => {
        if (prevOpen.current && !open) {
            anchorRef.current!.focus();
        }
        prevOpen.current = open;
    }, [open]);


    const updatePackClick = (cards_pack: RequestUpdatePackType) => {
        dispatch(UpdatePackTC(cards_pack))
    }

    const deletePackClick = async (pack_id: string) => {
        await dispatch(DeletePackTC(pack_id))
        navigate(Paths.packsRoute)
    }

    const goToLearnHandler = (card_pack_id: string) => {
        dispatch(setPacksIdAC({packsId: card_pack_id}))
        navigate(`/learn/${card_pack_id}`)
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
                className={style.title_my_cards}
            >
                {packName}{packsUserId === myId && <MenuOpenIcon style={{margin: "10px"}} color={"primary"}/>}
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
                                        {cardsCount !== 0 &&
                                            <MenuItem onClick={handleClose}>
                                                <div className={style.icon_action}
                                                     onClick={() => {
                                                         goToLearnHandler(cardsPack_id)
                                                     }}
                                                >
                                                    <SchoolOutlinedIcon/>
                                                    <div className={style.name_icon}>Learn</div>
                                                </div>
                                            </MenuItem>}
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
                    <AddCardModal cardsPack_id={cardsPack_id}>
                        <Button className={style.button}
                                disabled={status === "loading"}
                                variant="outlined"
                                type="submit">
                            Add new card
                        </Button>
                    </AddCardModal>
                    :
                    <Button className={style.button}
                            disabled={status === "loading" || cardsCount === 0}
                            variant="outlined"
                            type="submit"
                            onClick={() => {
                                goToLearnHandler(cardsPack_id)
                            }}
                    > Learn to pack
                    </Button>
            }
        </div>
    );
};

