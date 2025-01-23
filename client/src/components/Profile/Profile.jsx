import React from 'react';
import {useDispatch} from "react-redux"
import "./Profile.css"
import {makeVisible} from "../../redux/uploadReducer";
import {getAvatar} from "../../tools/getAvatar"


const Profile = () => {
    const dispatch = useDispatch();

    async function imgUpload(event) {
        const upImage = event.target.files[0]
        await dispatch(getAvatar(upImage))
    }

    return (
        <div className="profile">
            <div className="profile__avatar">
                <button className="profile__avatarDelete">Delete..</button>

                <label htmlFor="imgUpload" className="profile__label-input"
                       onClick={() => dispatch(makeVisible(true)) }
                > აირჩიეთ ფაილი </label>

                <input type="file" id="imgUpload" className="profile__input" placeholder="ატვირთეთ ავატარი"
                       accept="image/*"
                       onChange ={event => imgUpload(event)}
                />
            </div>
        </div>
    );
};

export default Profile;
