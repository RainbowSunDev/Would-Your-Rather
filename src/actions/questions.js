import { formatQuestion } from "../apis/_DATA";

export const GET_QUESTIONS = "GET_QUESTIONS";
export const ADD_QUESTION = "ADD_QUESTION";
export const CREATE_QUESTION_ERROR = "CREATE_QUESTION_ERROR";

export default function addNewQuestion(question) {
	//TODO Make async calls to the database
	const formattedQuestion = formatQuestion({
		author: question.author,
		optionOneText: question.optionOne,
		optionTwoText: question.optionTwo,
	});
	return (dispatch, getState, { getFirebase, getFirestore }) => {
		const firestore = getFirestore();

		firestore
			.collection("questions")
			.doc(formattedQuestion.id)

			.set({
				...question,
				...formattedQuestion,
			})
			.then(() => {
				dispatch({
					type: ADD_QUESTION,
					question,
				});
			})
			.catch((err) => dispatch({ type: CREATE_QUESTION_ERROR, err }));
	};
	/* 	return {
		type: GET_QUESTIONS,
		questions,
	}; */
}
