import React from 'react';
import style from './NotFoundPage.module.css'
import {NavLink} from 'react-router-dom';
import {Animation404} from '../../common/lottieAnimation/LottieAnimationFor404';
import {Zoom} from 'react-awesome-reveal';
import bgNight from '../../assets/backgroundImgs/noch.jpeg'

export const NotFoundPage = () => {
    return (
        <div style={{backgroundImage: `url(${bgNight})`}} className={style.not_found_wrapper}>
            <div className={style.contain_block}>
                <div className={style.info_for_back}>
                    <h1 className={style.title_404}>
                        <Zoom direction={'down'} duration={1000}>404 not found </Zoom>
                    </h1>
                    <Zoom direction={'left'} duration={1000}>
                        <div className={style.block_wrapper}>
                            <div className={style.text_wrapper}>
                                Something went wrong. Let's go back to the
                                <NavLink to={'/profile'} className={style.go_to_login}> Profile page </NavLink>
                            </div>
                        </div>
                    </Zoom>
                </div>
                <Zoom direction={'right'} duration={2000}>
                    <div className={style.first_circle}>
                        <div className={style.animation_wrapper}><Animation404/></div>
                    </div>
                </Zoom></div>
        </div>
    );
};
