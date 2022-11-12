import React from 'react';
import styleProfile from './ProfilePage.module.css'

export const ProfilePage = () => {
    return (
        <div>
            <div><a href="/" className={styleProfile.back_link}> Back to Packs List</a></div>
            <div>
                <h2 className={styleProfile.title}>Personal Information</h2>

                <img src="" alt=""/>
                <div>Name</div>
                <div>email</div>

                <button>Log out</button>


            </div>
        </div>
    );
};

