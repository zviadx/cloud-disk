const initialState = {
    currentUser: {},
    isAuth: true
}

const SET_USER = "SET_USER"
const LOG_OUT = "LOG_OUT"

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER: return {...state, currentUser: action.payload, isAuth: true}
        case LOG_OUT: return {...state, isAuth: false}
    default: return state
    }
}

export const getUser = (user) => ({type: SET_USER, payload: user})
export const logOut = () => ({type: LOG_OUT})
