const initialState = {
    isVisible: false,
    files: [{
        name: "",
        progress: 0,
        id: 0
    }],
}

export const ADD_UPLOAD_FILES = "ADD_UPLOAD_FILES"
export const MAKE_VISIBLE = "MAKE_VISIBLE"
export const CHANGE_PROGRESS = "CHANGE_PROGRESS"
export const REMOVE_ITEM = "REMOVE_ITEM"

export const uploadReducer = (state = initialState, action) => {
    switch(action.type) {
        case ADD_UPLOAD_FILES: return {...state, files: [...state.files, {...action.payload, id: action.payload.id}]}
        case MAKE_VISIBLE: return {...state, isVisible: action.payload}
        case CHANGE_PROGRESS: return {...state, files: [...state.files.map(file => file.id === action.payload.id
                ? {...file, progress: action.payload.progress}
                : {...file})]}
        case REMOVE_ITEM: return {...state, files: [...state.files.filter(file => file.id !== action.payload.id)]}

    default: return state
    }

}

export const filesStore = (file) => ({type: ADD_UPLOAD_FILES, payload: file})
export const makeVisible = (bool) => ({type: MAKE_VISIBLE, payload: bool})
export const changeProgress = (progress) => ({type: CHANGE_PROGRESS, payload: progress})
export const removeItem = (file) => ({type: REMOVE_ITEM, payload: file})