export const GET_POLLS = "GET_POLLS";

export function getPolls(polls) {
	return {
		type: GET_POLLS,
		polls,
	};
}
