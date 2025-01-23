import axios from "axios"
import {getUser} from "../redux/userReducer"


export const getCurrUser = (email, password) => async(dispatch) => {
    try {
        await axios.post('http://localhost:5000/api/auth/login', {email, password})
            .then (response => {
                if (response.status !== 200) {
                    throw new Error( "There is some problems with LogIn" )
                }
                dispatch(getUser(response.data.user.id))
                localStorage.setItem("token", response.data.token)
            })
    } catch (err) {
        alert(err.message)
    }
}

