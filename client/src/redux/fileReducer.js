const initialState = {
    files: [],
    currentDir: null,
    dirsStack: [],
    modal: false
}

export const SET_FILE = "SET_FILE"
export const GET_DIR = "GET_DIR"
export const DIRS_STACK = "DIRS_STACK"
export const SET_MODAL = "SET_MODAL"

export const fileReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_FILE : return {...state, files: action.payload}
        case GET_DIR : return {...state, currentDir: action.payload}
        case DIRS_STACK : return {...state, dirsStack: [...state.dirsStack, action.payload]}
        case SET_MODAL : return  {...state, modal: action.payload}
    default: return state
    }
}

export const setFile = (file) => ({type: SET_FILE, payload: file})
export const getDir = (dir) => ({type: GET_DIR, payload: dir})
export const dirStack = (stackItem) => ({type: DIRS_STACK, payload: stackItem})
export const setModal = (modal) => ({type: SET_MODAL, payload: modal})
