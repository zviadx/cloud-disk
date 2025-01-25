import axios from "axios"
import {getFiles} from "./getFiles"
import {changeProgress, filesStore} from "../redux/uploadReducer"


export const upFile = (file, dirId) => async (dispatch) => {
    try {
        const formData = new FormData()
        formData.append("file", file)
        dirId && formData.append("parent", dirId)

        const upFile = {name: file.name, progress: 0, id: Date.now()}
        dispatch(filesStore(upFile))

        await axios.post('http://localhost:5555/api/files/uploader', formData
            , {
                headers: {authorization: `Bearer ${localStorage.getItem('token')}`}

                , onUploadProgress: progressEvent => {
                    const totalLength = progressEvent.lengthComputable ? progressEvent.total : progressEvent.target.getResponseHeader('content-length') || progressEvent.target.getResponseHeader('x-decompressed-content-length');
                    console.log('total', totalLength)
                    if (totalLength) {
                        upFile.progress = Math.round((progressEvent.loaded * 100) / totalLength)
                        console.log(`Is ${upFile.progress}`)
                        dispatch(changeProgress(upFile))

                    }

                }

            }
        )
            .then(response => {
                dispatch(getFiles(response.data.parent))

            })
    } catch (e) {
        console.error(e)
    }

}