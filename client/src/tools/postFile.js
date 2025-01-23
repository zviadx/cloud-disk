import axios from "axios"
import {setFile, getDir} from "../redux/fileReducer";


export const postFile = (name, type, parent) => async (dispatch) => {
        try {

            await axios.post('http://localhost:5000/api/files', {
                name,
                type,
                parent
            }, {
                    headers: {authorization: `Bearer ${localStorage.getItem('token')}`}})
                    .then(response => {
                    dispatch(setFile(response.data.file))
                    dispatch(getDir(response.data.file.path))
                })
        } catch (e) {
            console.error(e)
        }

}