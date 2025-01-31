import  {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {createFolder} from "../../tools/createFolder";
import {setModal} from "../../redux/fileReducer";
// import {Navigate} from "react-router";


const FolderModal = () => {
    const [inputValue, setInputValue] = useState('')
    const currentFolderId = useSelector(state => state.files.currentDir)
    const authModal = useSelector(state => state.files.modal)
    const dispatch = useDispatch()

    async function keyPressHandler(event) {
        if (event.key === "Enter") {
            await dispatch(createFolder(inputValue, currentFolderId))
            setInputValue("")
            dispatch(setModal(false))
        }
    }

    async function clickHandler() {
        await dispatch(createFolder(inputValue, currentFolderId))
        setInputValue("")
        // dispatch(setModal(false))
    }

    return (
    <div
        onClick={() => {
            dispatch(setModal(false))
        }}
        className={
            authModal
                ? "fixed top-0 left-0 w-screen h-[calc(100vh+200px)] bg-black/50 flex items-center justify-center"
                : "hidden"
            }
    >

        <div
            className="w-[400px] h-[150px] bg-white rounded-[15px] flex flex-col items-center justify-center"
            onClick={event => event.stopPropagation()}
        >
            <input
                // className="w-[300px] h-[30px] border-0 border-b-[3px] border-b-[#566885] outline-none p-[5px]"
                className="relative w-[200px] left-[100px] top-[50px] border-0 border-b-[3px] border-b-teal-500 outline-none"
                placeholder="Enter Folder Name"
                type="text"
                value = {inputValue}
                onChange={event => setInputValue(event.target.value)}
                onKeyDown = {(event) => keyPressHandler(event)}

            />
                <button
                    // className="w-[100px] h-[30px] mt-[10px] bg-[#4b78ea] text-white rounded-[5px] cursor-pointer"
                    className="w-[60px] relative left-[100px] top-[70px] rounded-[5px] border-2 border-teal-500"
                        onClick={event => {
                            event.stopPropagation()
                            clickHandler().then(() => {
                                dispatch(setModal(false))
                            })
                        }}
                >
                    accept
                </button>

        </div>

    </div>
    )
};

export default FolderModal;