import React from 'react';
import styleProfile from './ProfilePage.module.css'

export const ProfilePage = () => {
    return (
        <div className={styleProfile.ProfilePage}>
            <div><a href="/" className={styleProfile.back_link}> Back to Packs List</a></div>
            <div className={styleProfile.wrapper}>
                <h2 className={styleProfile.title}>Personal Information</h2>

                <img src="" alt="avatar"/>
                <div>Name</div>
                <div>email</div>

                <button>Log out</button>


            </div>
        </div>
    );
};

