
import Login from "./Login/Login";
import Registration from "./Registration/Registration";
import FileCreate from "./FileCreate/FileCreate"
import FolderModal from "./FolderModal/FolderModal";
import Navbar from "./Navbar/Navbar";
import NewNavbar from "./NewNavbar/NewNavbar";
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {useSelector} from "react-redux";
import Disk from "./Disk/Disk";
import Profile from "./Profile/Profile"
import {Navigate} from "react-router";


const App = () => {
    const isAuth = useSelector(state => state.user.isAuth);

    return (
        <BrowserRouter >
            <div className="">
                <div className="fixed top-0 left-0 right-0 mb-9 z-10 bg-white/50">
                    <Navbar />
                </div>
            <div className="mt-20">
                {isAuth
                    ?
                    <Routes>
                        <Route path="/file-create"  element={<FileCreate />}/>
                        <Route path="/disk" element={<Disk />} />
                        <Route path="/disk/:id" element={<Disk />} />
                        <Route path="/Profile" element={<Profile />} />
                        <Route path="/createFolder" element={<FolderModal />} />
                        <Route path="/newNavbar" element={<NewNavbar />} />
                        <Route path="*" element={<Navigate to={`/disk`} /> } />
                    </Routes>

                    :
                    <Routes>
                        <Route path="/login"  element={<Login/>}/>
                        <Route path="/registration"  element={<Registration/>}/>
                        <Route path="*" element={<Navigate to={`/login`} /> } />
                    </Routes>
                }
            </div>
            </div>


        </BrowserRouter>
    )
};

export default App;