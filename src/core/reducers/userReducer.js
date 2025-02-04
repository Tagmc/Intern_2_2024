// import * as actions from "../actionTypes/demoActionTypes";


const initialState = {
	error: "",
	success: "",
	// token: null,
	// refreshToken: null,
	// sessionId: null,
	// userInfo: null,
	// event: null
	events: {}
};

export default function UserReducer(
	state = initialState,
	action
) {
	switch (action.type) {
		// case CREATE_ERROR:
		// 	return {
		// 		...state,
		// 		error: action.error
		// 	};
		// case CREATE_SUCCESS:
		// 	return {
		// 		...state,
		// 		success: action.success
		// 	};
		
		default:
			return state;
	}
}