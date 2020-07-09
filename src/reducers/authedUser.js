import { AUTHED_USER } from "../actions/authedUser";

export default function authUser(state = null, action) {
	switch (action.type) {
		case AUTHED_USER:
			return action.id;
		default:
			return state;
	}
}
