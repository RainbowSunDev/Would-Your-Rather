import { formatUser } from "../utlis/_DATA";

export const GET_USERS = "GET_USERS";
export const ADD_USERS = "ADD_USER";
export const ADD_USERS_ERROR = "ADD_USER_ERROR";

export default function addNewUser(user) {
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
}
