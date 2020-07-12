import { combineReducers } from "redux";
import users from "./users";
import questions from "./questions";
import authUser from "./authedUser";
import { firestoreReducer } from "redux-firestore";
import { firebaseReducer } from "react-redux-firebase";
export default combineReducers({
	users,
	questions,
	authUser,
	firestore: firestoreReducer,
	firebase: firebaseReducer,
});
