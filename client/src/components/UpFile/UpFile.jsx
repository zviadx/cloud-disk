import React from 'react';
import {useDispatch} from "react-redux"
import "./UpFile.css"
import {removeItem} from "../../redux/uploadReducer";

const UpFile = ({file}) => {
    const dispatch = useDispatch()
    return (
        <div className="upFile">
            <div className="upFile__header">
                <div className="upFile__title">{file.name}</div>
                <button
                    className="upFile__close"
                    onClick={() => {
                        dispatch(removeItem(file))
                    }}
                >X</button>
            </div>

            <div className="upFile__progress-bar">
                <div
                    className="upFile__upload-bar"
                    style={{'width':`${file.progress}%`}}
                >
                <div className="upFile__percents">{file.progress}%</div>
                </div>
            </div>
        </div>
    );
};

export default UpFile;