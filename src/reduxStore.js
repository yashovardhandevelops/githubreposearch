import { createStore } from "redux";
import combinedReducer  from "./reducers/combinedReducer";

const store = createStore(combinedReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;