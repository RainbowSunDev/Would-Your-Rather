export const AUTHED_USER = "AUTHED_USER";

export function receiveAuthUser(id) {
	return {
		type: AUTHED_USER,
		id,
	};
}
