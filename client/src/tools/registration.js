import axios from "axios"


export const setUser = (email, password) => async (dispatch) => {
    try {
        await axios.post("http://localhost:5000/api/auth/registration", {email, password})
            .then(response => console.log(response.data))
    } catch(err) {
        console.log(err.message)

    }
}