import { formatQuestion } from "../apis/_DATA";

export const GET_QUESTIONS = "GET_QUESTIONS";
export const ADD_QUESTION = "ADD_QUESTION";
export const CREATE_QUESTION_ERROR = "CREATE_QUESTION_ERROR";

export default function addNewQuestion(question) {
	const formattedQuestion = formatQuestion({
		author: question.author,
		optionOneText: question.optionOneText,
		optionTwoText: question.optionTwoText,
		uid: question.uid,
	});

	return (dispatch, getState, { getFirebase, getFirestore }) => {
		const firestore = getFirestore();
		const firebase = getFirebase();

		firestore
			.collection("questions")
			.doc(formattedQuestion.id)

			.set({
				...formattedQuestion,
			})
			.then(() => {
				firestore
					.collection("users")
					.doc(question.uid)
					.update({
						questions: firebase.firestore.FieldValue.arrayUnion(
							formattedQuestion.id
						),
					})
					.then(() =>
						dispatch({
							type: ADD_QUESTION,
							question,
						})
					);
			})
			.catch((err) => dispatch({ type: CREATE_QUESTION_ERROR, err }));
	};
}
