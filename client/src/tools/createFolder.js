import axios from "axios";
import {getFiles} from "./getFiles";


export const createFolder = (folder, parentFolderId) => async(dispatch) => {
    try {
        await axios.post('http://localhost:5000/api/files/createFolder',
            {folder: folder, parentFolderId: parentFolderId},
            {headers: {authorization: `Bearer ${localStorage.getItem('token')}`}})
            .then(res => {
                if (res.status === 200) {
                    dispatch(getFiles(res.data.Folder.parent))
                }
            } )
    } catch (error) {
        alert(error.message)
    }
}