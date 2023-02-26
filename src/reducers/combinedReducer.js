import reposReducer from './reducer'
import { combineReducers } from "redux";

const combinedReducer = combineReducers(
    {
        reposReducer
    }
);

export default combinedReducer;