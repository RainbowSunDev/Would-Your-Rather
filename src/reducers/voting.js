export default function questions(state = {}, action) {
	switch (action.type) {
		case "VOTING_SUCCESS": {
			console.log("VOTING_SUCCEEDED");
			return { ...state, voting: action.qid };
		}
		case "VOTING_FAILURE": {
			console.log("VOTING__FAILED", action.err);
			return { state };
		}
		default:
			return state;
	}
}
