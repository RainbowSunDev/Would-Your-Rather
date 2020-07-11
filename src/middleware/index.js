import thunk from "redux-thunk";
import { getFirebase, reactReduxFirebase } from "react-redux-firebase";
import { getFirestore, reduxFirestore } from "redux-firestore";
import { applyMiddleware, compose } from "redux";

import fbConfig from "../config/fbConfig";
import logger from "./logger";

export default compose(
	applyMiddleware(
		thunk.withExtraArgument({ getFirebase, getFirestore }),
		logger
	),
	reduxFirestore(fbConfig),
	reactReduxFirebase()
);
