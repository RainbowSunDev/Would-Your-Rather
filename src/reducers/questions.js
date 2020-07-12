import { ADD_QUESTION, CREATE_QUESTION_ERROR } from "../actions/questions";

export default function questions(state = {}, action) {
	switch (action.type) {
		case ADD_QUESTION:
			console.log("created question", action.question);
			return { ...state, ...action.question };
		case CREATE_QUESTION_ERROR:
			console.log("ERROR created new question", action.err);
			return state;

		default:
			return state;
	}
}
