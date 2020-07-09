export const GET_USERS = "GET_USERS";

export default function receiveUsers(users) {
	return {
		type: GET_USERS,
		users,
	};
}
