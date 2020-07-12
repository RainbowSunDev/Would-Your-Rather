export const AUTHED_USER = "AUTHED_USER";

export default function receiveAuthUser(id) {
	return (dispatch) =>
		dispatch({
			type: AUTHED_USER,
			id,
		});
}
