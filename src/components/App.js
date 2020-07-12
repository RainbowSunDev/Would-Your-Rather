import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";
/* import { handleInitialData } from "../actions/shared";
 */ import { connect } from "react-redux";
import { compose } from "redux";

import NavBar from "./Nav";
import Dashboard from "./Dashboard";
import HomePage from "./HomePage";
import { firestoreConnect } from "react-redux-firebase";
class App extends Component {
	render() {
		const { authError } = this.props;
		console.log("__APP__", this.props);

		return (
			<div className="app">
				<Router>
					<NavBar authUser={authError} />

					{authError === null ? <HomePage users={this.props.users} /> : null}
				</Router>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		users: state.firestore.data.users,
		authError: state.authUser.authError,
		questions: state.firestore.data.questions,
	};
}
export default compose(
	connect(mapStateToProps),
	firestoreConnect([{ collection: "users" }, { collection: "questions" }])
)(App);
