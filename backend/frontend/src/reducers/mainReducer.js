import hardReducer from './hardReducer';
import easyReducer from './easyReducer';
import mediumReducer from './mediumReducer';
import totalEasyCount from "./totalEasy";
import totalHardCount from "./totalHard";
import totalMediumCount from "./totalMedium";
import { combineReducers } from "redux";
import modeReducer from "./modeReducer";

const rootReducer = combineReducers({
    hardReducer, easyReducer, mediumReducer, totalEasyCount, totalHardCount, totalMediumCount, modeReducer
})

export default rootReducer;