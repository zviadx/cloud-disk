import axios from "axios"
import {setFile} from "../redux/fileReducer";


export const getFiles = (dirId, sort) => async (dispatch) => {
    try {
        let url = `http://localhost:5555/api/files`
        if (dirId) {
            url = `http://localhost:5555/api/files?parent=${dirId}`
        }
        if (sort) {
            url = `http://localhost:5555/api/files?sort=${sort}`
        }
        if (dirId && sort) {
            url = `http://localhost:5555/api/files?parent=${dirId}&sort=${sort}`
        }

        await axios.get(url, {
            headers: {authorization: `Bearer ${localStorage.getItem('token')}`}
        })
            .then(response => {
                dispatch(setFile(response.data))
                // dispatch(getDir(response.data.parent))
            })

    } catch (e) {
        console.error(e)
    }

}