import axios from "axios"


export const setUser = (email, password) => async () => {
    try {
        await axios.post("http://localhost:5555/api/auth/registration", {email, password})
            .then(response => console.log(response.data))
    } catch(err) {
        console.log(err.message)

    }
}