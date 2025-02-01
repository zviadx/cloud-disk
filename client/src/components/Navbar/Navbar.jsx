import  {useState} from 'react';

import logo from "../../assets/img/navbar-logo.svg"
import {NavLink} from "react-router-dom";
import {logOut} from "../../redux/userReducer"
import {getDir, setModal} from "../../redux/fileReducer";
import {useDispatch, useSelector} from "react-redux"
import {searchFile} from "../../tools/searchFile"
import Avatar from "../../assets/img/avatar.svg"
import UpArrow from "../../assets/img/up-arrow.svg"
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
    const [doSearch, setDoSearch] = useState('')
    const authModal = useSelector(state => state.files.modal)

    const setSearchTimeout = (event) => {
        if (doSearch) {
            clearTimeout(doSearch)
        }
        // setTimeout(() => {
            setDoSearch(event.target.value)
            dispatch(searchFile(event.target.value)).then(r => console.log(r))
        // }, 1000)
    }


    return (
        <div className="w-full h-[50px] bg-white flex items-center justify-between px-5 py-0 border-b-[3px] border-b-[blue] border-solid;">
            <div className="flex items-center;">
                <img src={logo} alt="" className="mr-[15px]"/>
                <div className="text-2xl font-bold">MERN CLOUD</div>

                <div
                    id="search-container"
                    contentEditable
                    className="ml-8 px-4 py-2 border rounded-2xl shadow-sm focus:ring-2 focus:ring-blue-500
                    focus:border-blue-500 outline-none text-gray-700 w-[300px] relative flex items-center"
                    role="textbox"
                    suppressContentEditableWarning={true}
                >
                    <svg width="1em" height="1em" viewBox="0 0 20 20"
                         className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 pointer-events-none z-10
                         align-middle me-3 text-gray-30 shrink-0 group-betterhover:hover:text-gray-70">
                        <path
                            d="M14.386 14.386l4.0877 4.0877-4.0877-4.0877c-2.9418 2.9419-7.7115 2.9419-10.6533 0-2.9419-2.9418-2.9419-7.7115 0-10.6533 2.9418-2.9419 7.7115-2.9419 10.6533 0 2.9419 2.9418 2.9419 7.7115 0 10.6533z"
                            stroke="currentColor" fill="none" strokeWidth="2" fillRule="evenodd"
                            strokeLinecap="round" strokeLinejoin="round"></path>
                    </svg>
                    <input
                        className="ml-4 pl-1 w-full h-full focus:outline-0"
                        onChange={(event) => {
                            setSearchTimeout(event)
                        }}
                        value={doSearch}
                    />
                </div>


            </div>

            {!isAuth
                ?
                <div className="flex items-center gap-4">
                    <div className="mr-4"><NavLink to="/login">Login</NavLink></div>
                    <div className="mr-4"><NavLink to="/registration">Registration</NavLink></div>
                </div>
                :
                <div className="flex items-center gap-4">

                    <img src={Folder} alt=""
                         className="w-[45px] h-[35px] rounded-lg bg-white cursor-pointer active:translate-x-[1px] active:translate-y-[1px]"
                         onClick={() => {
                             console.log(currDir)
                             dispatch(setModal(true))
                         }}
                    />

                    {authModal && <FolderModal/>}

                    <NavLink
                        to={`/disk?dir=${currDir}`}
                        style={({isActive}) => ({
                            color: isActive ? "#4b78ea" : "black"
                        })}
                    >
                        <img
                            src={`${UpArrow}`} alt=""
                            onClick={() => {
                                dispatch(getDir(stack.pop()))
                                console.log(`მისამართების სტეკი -- ${stack.dirsStack}`)
                            }}
                        />
                    </NavLink>

                    <div
                        className="mr-4"
                        onClick={() => {
                            dispatch(logOut())
                            localStorage.removeItem("token")
                        }}
                    >
                        <NavLink to="/Exit">SIGN OUT</NavLink>
                    </div>

                    <NavLink to="/Profile">
                        <img
                            src={currUser.avatar ? `${SERVER_URL + "fail.svg"}` : `${Avatar}`} alt=""
                            className="w-10 h-10 rounded-lg bg-white cursor-pointer ml-[1px]"
                        />
                    </NavLink>

                </div>
            }

        </div>
    );
};

export default Nav_bar;