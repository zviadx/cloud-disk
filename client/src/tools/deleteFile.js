import axios from "axios"
import {getFiles} from "./getFiles";


export const deleteFile = (file) => async (dispatch) => {
    try {
        await axios.delete(`http://localhost:5000/api/files/delete?id=${file._id}`, {
            headers: {authorization: `Bearer ${localStorage.getItem('token')}`}
        })
            .then(response => {
                if (response.status === 200) {
                    dispatch(getFiles(file.parent))
                }
            })
    } catch (err) {
        alert(err.message)
    }
}