const initState = {
	authError: null,
};

const authReducer = (state = initState, action) => {
	switch (action.type) {
		case "LOGIN_ERROR":
			console.log("login error");
			return {
				...state,
				authError: "Login failed",
			};
		case "LOGIN_SUCCESS":
			console.log("login success");
			return {
				authError: null,
			};
		case "SIGNOUT_SUCCESS":
			console.log("SIGNOUT_SUCCESS");
			return state;
		case "SIGNUP_SUCCESS":
			console.log("SIGNUP_SUCCESS");
			return { ...state, authError: null };
		case "SIGNUP_FAILED":
			console.log("SIGNUP_FAILED");
			return { ...state, authError: action.err.message };
		default:
			return state;
	}
};

export default authReducer;
