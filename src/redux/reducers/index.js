import { combineReducers } from "redux";
import courses from "./courseReducer";
import authors from "./authorReducer";
import apiCallsInProgress from './apiStatusReducer';

const rootReducers = combineReducers({
	courses,
	authors,
	apiCallsInProgress
});

export default rootReducers;
