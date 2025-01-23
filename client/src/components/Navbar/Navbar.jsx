import React, {useState} from 'react';
import "./Navbar.css"
import logo from "../../assets/img/navbar-logo.svg"
import {NavLink} from "react-router-dom";
import {logOut} from "../../redux/userReducer"
import {getDir, setModal} from "../../redux/fileReducer";
import {useDispatch, useSelector} from "react-redux"
import {searchFile} from "../../tools/searchFile"
import Avatar from "../../assets/img/avatar.svg"
import Folder from "../../assets/img/folder.svg"
import {SERVER_URL} from "../../config";
import FolderModal from "../FolderModal/FolderModal";

// NAVBAR DESIGN


const Nav_bar = () => {
    const isAuth = useSelector(state => state.user.isAuth)
    const stack = useSelector(state => state.files.dirsStack)
    const currDir = useSelector(state => state.files.currentDir)
    const currUser = useSelector(state => state.user.currentUser)
    const dispatch = useDispatch()
    const [doSearch, setDoSearch] = useState(false)
    // const [authModal, setAuthModal] = useState(false)
    const authModal = useSelector(state => state.files.modal)

    const setSearchTimeout = (event) => {
        if (doSearch !== false) {
            clearTimeout(doSearch)
        }
        setDoSearch(setTimeout((value) => {
            dispatch(searchFile(value))
        }, 1000, event.target.value) )
    }


    return (
        <div className="navbar">
            <div className="navbar__left">
                <img src={logo} alt="" className="navbar__logo"/>
                <div className="navbar__header">MERN CLOUD</div>
                <input
                    className="navbar__search"
                    placeholder="Search..."
                    onChange={(event) => {
                        setSearchTimeout(event)}
                    }

                >

                </input>
            </div>

            {!isAuth
                ?
                <div className="navbar__email">
                    <div className="navbar__login"><NavLink to="/login">Login</NavLink></div>
                    <div className="navbar__registration"><NavLink to="/registration">Registration</NavLink></div>
                </div>
                :
                <div className="navbar__email">

                        <img src={Folder} alt=""
                             className="navbar__folder"
                             onClick={() => {
                                 console.log(currDir)
                                 dispatch(setModal(true))
                             } }
                        />

                    { authModal && <FolderModal /> }

                    <div className="navbar__login"
                         onClick ={() => { dispatch(getDir(stack.pop())) }}
                    ><NavLink
                        to="/disk"
                        className={(isActive) =>
                            isActive && {backgroundColor: "#3e56af"}
                        }
                    >up..</NavLink>
                    </div>

                    <div
                        className="navbar__exit"
                        onClick={() => {
                            dispatch(logOut())
                            localStorage.removeItem("token")
                        }}
                    >
                        <NavLink to="/Exit">EXIT</NavLink>
                    </div>

                    <NavLink to="/Profile" >
                    <img
                        src={currUser.avatar ? `${SERVER_URL + "fail.svg"}` : `${Avatar}`} alt=""
                        className="navbar__avatar"
                    />
                    </NavLink>

                </div>
            }
        </div>
    );
};

export default Nav_bar;