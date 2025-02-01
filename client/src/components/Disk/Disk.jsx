import {useState} from 'react';
import {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import FileItem from "../FileItem/FileItem.jsx"
import Uploader from "../Uploader/Uploader";
import {getFiles} from "../../tools/getFiles"
// import { Link, animateScroll as scroll } from "react-scroll";
import {upFile} from "../../tools/uploadFile"
import {makeVisible} from "../../redux/uploadReducer";
import File from '../../assets/img/icons8-file.svg'



const Disk = () => {
    const dispatch = useDispatch();
    const isAuth = useSelector(state => state.user.isAuth)
    const files = useSelector(state => state.files)
    const [dragEnter, setDragEnter] = useState(false)
    const [sort, setSort] = useState('')


    useEffect( () => {
        async function fetchData() {
            await dispatch(getFiles(files.currentDir, sort))
        }
        fetchData().then(() => console.log("Files fetched"))
    }, [dispatch, files.currentDir, sort])
    
    function NotAuthenticated() {
        if (!isAuth) {
            return (
                <div className="ml-6 mt-20">
                    <h1>You are not authenticated</h1>
                </div>
            );
        }
    }

    function failUpload(event) {
        const upFiles = [...event.target.files]
        upFiles.forEach((file) => dispatch(upFile(file, files.currentDir)))
    }


    function onDragEnterHandler(event){
        event.preventDefault()
        event.stopPropagation()
        setDragEnter(true)
    }


    function onDragLeaveHandler(event){
        event.preventDefault()
        event.stopPropagation()
        setDragEnter(false)
    }


    function onDropHandler(event){
        event.preventDefault()
        event.stopPropagation()
        let upFiles = [...event.dataTransfer.files]
        setDragEnter(false)
        upFiles.map((file) => dispatch(upFile(file, files.currentDir)))
    }

try {
    return (
        !dragEnter
            ?
            <div className="relative self-center"
                 onDragEnter={onDragEnterHandler}
                 onDragLeave={onDragLeaveHandler}
                 onDragOver={onDragEnterHandler}
            >

                {NotAuthenticated()}

                <div className="flex flex-row">
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

                <select
                    className="relative self-end top-[-16px]"
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                >
                    <option value='name'>on Name</option>
                    <option value='type'>on Type</option>
                    <option value='size'>on Size</option>
                </select>
                </div>

                {files.files.map(file => <FileItem key={file._id} file={file}/>)}
                <Uploader/>
            </div>

            :
            <div
                className="flex w-4/5 border-[3px] border-dashed border-teal-500 h-[calc(100vh-90px)] m-5 justify-center items-center text-[40px]"
                // onDragEnter={onDragEnterHandler}
                onDragLeave={onDragLeaveHandler}
                onDragOver={onDragEnterHandler}

                onDrop={onDropHandler}
            >
                Get files here
            </div>

    );
} catch (e) {
    console.log(e.message)
}
};

export default Disk;