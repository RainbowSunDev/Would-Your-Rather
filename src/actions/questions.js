export const GET_QUESTIONS = "GET_QUESTIONS";
export const ADD_QUESTION = "ADD_QUESTION";
export const CREATE_QUESTION_ERROR = "CREATE_QUESTION_ERROR";

export default function receiveQuestions(question) {
	//TODO Make async calls to the database
	return (dispatch, getState, { getFirebase, getFirestore }) => {
		const firestore = getFirestore();

		firestore
			.collection("questions")
			.add({
				...question,
				optionOne: {
					votes: ["ahmed3ba2i"],
					text: "Would you jump in the water",
				},
				optionTwo: {
					votes: ["lolo"],
					text: "Would you stay in the water for 10 hours",
				},
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
