import PropTypes from 'prop-types';
import fileFolder from "../../assets/img/icons8-folder.svg"
import fail from '../../assets/img/icons8-file.svg'
import {useDispatch, useSelector} from "react-redux"
import {getDir, dirStack} from "../../redux/fileReducer";
import recycle from "../../assets/img/Recycle_Bin.svg"
import download from "../../assets/img/download.svg"
import {getDownloadFile} from "../../tools/downloadFile"
import {deleteFile} from "../../tools/deleteFile"

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
        console.log(`მისამართი -- ${curDir}`)
    }

    return (
        <div className="w-4/5 border-b-[3px] border-b-[#566885] ml-[150px]
        pt-5 items-center self-center hover:scale-[1.01]
        shadow-md hover:shadow-lg transition-shadow duration-200 rounded-lg bg-white">
            <div
                className="grid grid-cols-10 items-center cursor-pointer"
                onClick={() => {
                    if (file.type === "dir") {
                        currDirHandler()
                    } else {
                        alert("It's not folder")
                    }
                }}
            >
                <img src={file.type === "dir" ? `${fileFolder}` : `${fail}`} alt="" className="col-start-1"/>
                <div className="col-start-2">{file.path}</div>
                <img
                    src={download}
                    alt=""
                    className="text-xs col-start-9 hidden group-hover:block"
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
                    className="col-start-10 hidden group-hover:block"
                    onClick={(e) => {
                        stopBrowserDefault(e)
                        dispatch(deleteFile(file)).then(r => console.log(r))
                    }}
                />
            </div>
        </div>
    );
};

export default FileItem;
