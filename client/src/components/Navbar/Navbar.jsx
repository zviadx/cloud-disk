import logo from "../../assets/img/navbar-logo.svg"
import {NavLink} from "react-router-dom";
import {getDir, setModal} from "../../redux/fileReducer";
import {useDispatch, useSelector} from "react-redux"
import Avatar from "../../assets/img/avatar.svg"
import UpArrow from "../../assets/img/upcol-com.svg"
import Folder from "../../assets/img/icons8-opened-folder.svg"
import {SERVER_URL} from "../../config";
import FolderModal from "../FolderModal/FolderModal";
import Dropdown from "../Dropdown/Dropdown.jsx";
import Login from "../../assets/img/login.svg"
import AddUser from "../../assets/img/user-add1.svg"
import File from "../../assets/img/filecol.svg";
import {makeVisible} from "../../redux/uploadReducer.js";
import {upFile} from "../../tools/uploadFile.js";
import {dropdownItems} from "./consts.js";
import Search from "../Search/Search.jsx";


const Navbar = () => {
    const isAuth = useSelector(state => state.user.isAuth)
    const stack = useSelector(state => state.files.dirsStack)
    const currDir = useSelector(state => state.files.currentDir)
    const currUser = useSelector(state => state.user.currentUser)
    const dispatch = useDispatch()
    const authModal = useSelector(state => state.files.modal)

    const files = useSelector(state => state.files)


    function failUpload(event) {
        const upFiles = [...event.target.files]
        upFiles.forEach((file) => dispatch(upFile(file, files.currentDir)))
    }

    return (
        <div className="w-full h-[50px] flex items-center justify-between px-5 py-0 border-b-[3px] border-b-[blue] border-solid;">
            <div className="flex items-center;">
                <img src={logo} alt="" className="mr-[15px]"/>
                <div className="text-2xl font-bold">MERN CLOUD</div>

                <Search />

            </div>

            {!isAuth
                ?
                <div className="flex items-center gap-4">
                    <div className="mr-4"><NavLink to="/login">
                        <img src={`${Login}`} alt="" className="mr-[15px]"/>
                    </NavLink></div>
                    <div className="mr-4"><NavLink to="/registration">
                        <img src={`${AddUser}`} alt="" className="mr-[15px]"/>
                    </NavLink></div>
                </div>
                :
                <div className="flex items-center gap-4">


                    <label htmlFor="fileUpload" className="ml-[50px] px-[10px] py-[5px] cursor-pointer">
                        {
                            <img
                                src={File} alt=""
                                onClick={() => dispatch(makeVisible(true))}
                            />
                        }
                    </label>
                    <input type="file" multiple={true} id="fileUpload" className="hidden"
                           onChange={(event) => failUpload(event)}
                    />

                    <img src={Folder} alt=""
                         className="w-[45px] h-[35px] rounded-lg bg-white cursor-pointer active:translate-x-[1px]
                         active:translate-y-[1px]"
                         onClick={() => {
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
                            }}
                        />
                    </NavLink>

                    <Dropdown
                        trigger={
                            <img
                                src={currUser.avatar ? `${SERVER_URL + "fail.svg"}` : `${Avatar}`} alt=""
                                className="w-10 h-10 rounded-lg bg-white cursor-pointer ml-[1px] mr-20"
                            />
                        }
                        items={dropdownItems(dispatch)}
                    />


                </div>
            }

        </div>
    );
};

export default Navbar;