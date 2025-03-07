import PropTypes from 'prop-types';
import fileFolder from "../../assets/img/icons8-folder.svg"
import fail from '../../assets/img/icons8-file.svg'
import {useDispatch, useSelector} from "react-redux"
import {getDir, dirStack} from "../../redux/fileReducer";
import recycle from "../../assets/img/Recycle_Bin.svg"
import download from "../../assets/img/download.svg"
import {getDownloadFile} from "../../tools/downloadFile"
import {deleteFile} from "../../tools/deleteFile"
import "./FileItem.css"

const FileItem = ({file}) => {
    FileItem.propTypes = {
        file: PropTypes.shape({
            _id: PropTypes.string.isRequired,
            type: PropTypes.string.isRequired,
            path: PropTypes.string.isRequired,
        }).isRequired,
    }

    const dispatch = useDispatch()
    const curDir = useSelector(state => state.files.currentDir)

    const stopBrowserDefault = (e) => {
        e.preventDefault();
        e.stopPropagation();
    }

    function currDirHandler() {
        dispatch(getDir(file._id))
        dispatch(dirStack(curDir))
        // console.log(`მისამართი -- ${curDir}`)
    }

    return (
        <div className="fileItem">
            <div
                className="fileItem__header"
                onClick={() => {
                    if (file.type === "dir") {
                        currDirHandler()
                    } else {
                        alert("It's not folder")
                    }
                }}
            >
                <img src={file.type === "dir" ? `${fileFolder}` : `${fail}`} alt="" className="fileItem__img"/>
                <div className="fileItem__name">{file.path}</div>
                <img
                    src={download}
                    alt=""
                    className="fileItem__download"
                    onClick={(e) => {
                        stopBrowserDefault(e)
                        if (file.type !== "dir") {
                            dispatch(getDownloadFile(file)).then(r => console.log(r))
                        } else {
                            alert("უნდა გაცნობო რომ საქაღალდეს ვერ გადმოწერ ვერა")
                        }
                    }}
                />
                <img
                    src={`${recycle}`}
                    alt=""
                    className="fileItem__recycler"
                    onClick={async (e) => {
                        stopBrowserDefault(e)
                        // console.log(`ფაილის იდე -- ${file._id}`)
                        await dispatch(deleteFile(file))
                    }}
                />
            </div>
        </div>
    );
};

export default FileItem;
