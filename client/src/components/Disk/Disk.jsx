import React, {useState} from 'react';
import {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import FileItem from "../FileItem/FileItem.jsx"
import Uploader from "../Uploader/Uploader";
import "./Disk.css"
import {getFiles} from "../../tools/getFiles"
// import { Link, animateScroll as scroll } from "react-scroll";
import {upFile} from "../../tools/uploadFile"
import {makeVisible} from "../../redux/uploadReducer";



const Disk = () => {
    const dispatch = useDispatch();
    const isAuth = useSelector(state => state.user.isAuth)
    const files = useSelector(state => state.files)
    const [dragEnter, setDragEnter] = useState(false)
    const [sort, setSort] = useState('')


    // const ffiles = [
    //     {_id:1, name:"rufus-3.5.exe", type:"exe", size:1052728, path:"rufus-3.5.exe", date: "2022-07-21", user: "6288e63193c65de122c248bc"},
    //     {_id:2, name:"A1", type:"dir", size:0, path:"A1", date: "2022-07-22", user: "6288e63193c65de122c248bc", parent:null}
    // ]


    useEffect( () => {
        async function fetchData() {
            await dispatch(getFiles(files.currentDir, sort))
        }
        fetchData().then(() => console.log("Files fetched"))
    }, [dispatch, files.currentDir, sort])
    
    function NotAuthenticated() {
        if (!isAuth) {
            return (
                <div className="disk__counter">
                    <h1>You are not authenticated</h1>
                </div>
            );
        }
    }


    // const checkLength = () => {
    //     if (!files.files.length) {
    //         return (
    //             <div>
    //                 <h1>There are no any files</h1>
    //             </div>
    //         )
    //     }
    // }

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
            <div className="disk"
                 onDragEnter={onDragEnterHandler}
                 onDragLeave={onDragLeaveHandler}
                 onDragOver={onDragEnterHandler}
            >

                {NotAuthenticated()}

                <label htmlFor="fileUpload" className="disk__label-input"
                       onClick={() => dispatch(makeVisible(true))}
                > აირჩიეთ ფაილ(ებ)ი </label>

                <input type="file" multiple={true} id="fileUpload" className="disk__input"
                       onChange={(event) => failUpload(event)}
                />


                <select
                    className="disk__select"
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                >
                    <option value='name'>on Name</option>
                    <option value='type'>on Type</option>
                    <option value='size'>on Size</option>
                </select>

                {files.files.map(file => <FileItem key={file._id} file={file}/>)}
                {/*{ffiles.map(file => <FileItem key={file._id} file={file} /> )}*/}
                <Uploader/>
            </div>

            :
            <div className="drop-area"
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