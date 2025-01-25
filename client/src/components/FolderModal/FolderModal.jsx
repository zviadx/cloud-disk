import  {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import "./FolderModal.css";
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
        className={authModal ? "modal" : "modal__close"}
    >

        <div
            className="modal__container"
            onClick={event => event.stopPropagation()}
        >
            <input
                className="modal__input"
                placeholder="Enter Folder Name"
                type="text"
                value = {inputValue}
                onChange={event => setInputValue(event.target.value)}
                onKeyDown = {(event) => keyPressHandler(event)}

            />

            {/*<NavLink*/}
            {/*    to="/disk"*/}
            {/*    className={(isActive) => {*/}
            {/*        isActive ? console.log("YES") : console.log("no no no no no")*/}
            {/*    }*/}
            {/*    }*/}
            {/*>*/}
                <button
                    className="modal__button"
                        onClick={event => {
                            event.stopPropagation()
                            clickHandler().then(() => {
                                dispatch(setModal(false))
                            })
                        }}
                >
                    accept
                </button>
            {/*</NavLink>*/}


        </div>

    </div>
    )
};

export default FolderModal;