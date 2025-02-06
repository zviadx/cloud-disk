import axios from "axios"
// import {FILES_URL} from "../config";
import {getUser} from "../redux/userReducer";


export const getAvatar = (file) => async (dispatch) => {
    try {
        const formData = new FormData()
        formData.append("file", file)
        await axios.post(`http://localhost:5555/api/files/upAvatar`, formData, {
            headers: {authorization: `Bearer ${localStorage.getItem('token')}`}
        })
            .then(response => {
                // console.log(response.data);
                dispatch(getUser(response.data))})
    } catch (err) {
        console.error(err)
    }
}