export default function questions(state = {}, action) {
	switch (action.type) {
		case "VOTING_SUCCESS": {
			return { ...state, ...action.qid };
		}
		case "VOTING_FAILURE": {
			console.log("VOTING__FAILED", action.err);
			return state;
		}
		default:
			return state;
	}
}
