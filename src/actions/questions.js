import { formatQuestion } from "../utlis/_DATA";

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
export function vote(qid, voting, loggedInUser) {
	return (dispatch, getState, { getFirebase, getFirestore }) => {
		const firebase = getFirebase();
		const firestore = getFirestore();
		console.log("__ACTION__", qid, voting, loggedInUser);
		const uid = loggedInUser;

		let questionColl = firestore.collection("questions").doc(qid);

		console.log(questionColl);
		questionColl
			.update(
				voting === "optionTwo"
					? { optionTwoVotes: firebase.firestore.FieldValue.arrayUnion(uid) }
					: { optionOneVotes: firebase.firestore.FieldValue.arrayUnion(uid) }
			)
			.then(() => {
				firestore
					.collection("users")
					.doc(uid)
					.get()
					.then((doc) => {
						let answers = doc.data().answers;
						answers[qid] = voting;
						firestore.collection("users").doc(uid).update({ answers: answers });
					});
			})
			.then(() => {
				dispatch({ type: "VOTING_SUCCESS", qid, voting });
			})
			.catch((err) => {
				dispatch({ type: "VOTING_FAILURE", err });
			});
	};
}
