import { combineReducers } from "redux";
import users from "./users";
import questions from "./questions";
import authUser from "./authedUser";

console.log("55555", authUser);
export default combineReducers({
	users,
	questions,
	authUser,
});
