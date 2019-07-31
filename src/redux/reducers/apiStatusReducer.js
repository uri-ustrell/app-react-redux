import * as types from "../actions/actionTypes";
import initialState from "./initialState";

const isActionSuccess = type =>
	type.substring(type.length - 8, type.length) === "_SUCCESS";

export default function ApiCallStatusReducer(
	state = initialState.apiCallsInProgress,
	action
) {
	if (action.type === types.BEGIN_API_CALL) {
		return state + 1;
	} else if (
		action.type === types.API_CALL_ERROR ||
		isActionSuccess(action.type)
	) {
		return state - 1;
	}
	return state;
}
