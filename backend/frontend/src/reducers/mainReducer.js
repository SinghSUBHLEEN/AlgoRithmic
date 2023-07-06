import hardReducer from './hardReducer';
import easyReducer from './easyReducer';
import mediumReducer from './mediumReducer';
import { combineReducers } from "redux";

const rootReducer = combineReducers({
    hardReducer, easyReducer, mediumReducer
})

export default rootReducer;