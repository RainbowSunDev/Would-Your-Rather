import { _getUsers, _getQuestions } from "../apis/_DATA";
import receiveUsers from "./users";
import receiveQuestions from "./questions";
import { receiveAuthUser } from "./authedUser";

const AUTHED_ID = "tylermcginnis";
export function handleInitialData() {
	return (dispatch) => {
		return _getUsers().then((users) => {
			_getQuestions().then((questions) => {
				//dispatch(receiveUsers(users));
				//dispatch(receiveQuestions(questions));
				//dispatch(receiveAuthUser(AUTHED_ID));
			});
		});
	};
}
