import { combineReducers } from "redux";
import users from "./users";
import questions from "./questions";
import receiveAuthUser from "./authedUser";

console.log("55555", receiveAuthUser);
export default combineReducers({
	users,
	questions,
	receiveAuthUser,
});
