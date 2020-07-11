import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App";
import { createStore, applyMiddleware, compose } from "redux";
import reducer from "./reducers";
import { Provider } from "react-redux";
/* import middleware from "./middleware";

 */ import thunk from "redux-thunk";
import { getFirebase, reactReduxFirebase } from "react-redux-firebase";
import { getFirestore, reduxFirestore } from "redux-firestore";

import fbConfig from "./config/fbConfig";

const store = createStore(
	reducer,
	compose(
		applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore })),
		reactReduxFirebase(fbConfig),
		reduxFirestore(fbConfig)
	)
);
console.log(store.getState());

ReactDOM.render(
	<Provider store={store}>
		<React.Fragment>
			<App />,
		</React.Fragment>
	</Provider>,

	document.getElementById("root")
);
