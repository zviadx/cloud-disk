import React from 'react';
import "./Uploader.css"
import {useSelector, useDispatch} from "react-redux"
import {makeVisible} from "../../redux/uploadReducer";
import UpFile from "../UpFile/UpFile";
import {CSSTransition, TransitionGroup} from "react-transition-group";

const Uploader = () => {
    const isVisible = useSelector(state => state.upload.isVisible)
    const upFiles = useSelector(state => state.upload.files)
    // const chgProgress = useSelector(state => state.upload.progress)
    const dispatch = useDispatch()


    return (
        isVisible
        &&
        <div className="uploader">
            <div className="uploader__header">
                <div className="uploader__title">Uploads...</div>
                <button
                    className="uploader__close"
                    onClick={() => dispatch(makeVisible(false))}
                >X</button>
            </div>

        <TransitionGroup>
            {upFiles.map(upFile =>
                <CSSTransition
                    key={upFile.id}
                    timeout={500}
                    classNames={'file'}
                    exit={false}
                >
                    <UpFile file={upFile}/>
                </CSSTransition>
            )}
        </TransitionGroup>

        </div>

    );
};

export default Uploader;