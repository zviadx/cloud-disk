import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk"
import {fileReducer} from "./fileReducer"
import {userReducer} from "./userReducer"
import {uploadReducer} from "./uploadReducer"
import {composeWithDevTools} from "redux-devtools-extension"
import logger from "redux-logger"


const rootReducer = combineReducers({
    files: fileReducer,
    user: userReducer,
    upload: uploadReducer
})

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(logger, thunk)))
