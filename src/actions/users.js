import { formatUser } from "../apis/_DATA";

export const GET_USERS = "GET_USERS";
export const ADD_USERS = "ADD_USER";
export const ADD_USERS_ERROR = "ADD_USER_ERROR";

/* export default function receiveUsers(users) {
	return {
		type: GET_USERS,
		users,
	};
} */

export default function addNewUser(user) {
	//TODO Make async calls to the database
	// johndoe: {
	/* 	id: "johndoe",
		name: "John Doe",
		avatarURL: "",
		answers: {
			xj352vofupe1dqz9emx13r: "optionOne",
			vthrdm985a262al8qx3do: "optionTwo",
			"6ni6ok3ym7mf1p33lnez": "optionTwo",
		},
		questions: ["6ni6ok3ym7mf1p33lnez", "xj352vofupe1dqz9emx13r"],
	}, */
	const formattedUser = formatUser(user);
	return (dispatch, getState, { getFirebase, getFirestore }) => {
		const firestore = getFirestore();

		firestore
			.collection("users")
			.doc(formattedUser.id)
			.set({
				...user,
				...formattedUser,
			})
			.then(() => {
				dispatch({
					type: ADD_USERS,
					user,
				});
			})
			.catch((err) => dispatch({ type: ADD_USERS_ERROR, err }));
	};
	/* 	return {
		type: GET_QUESTIONS,
		questions,
	}; */
}
