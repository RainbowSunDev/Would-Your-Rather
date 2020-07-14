import React, { Component } from "react";

import { BrowserRouter as Router, Route } from "react-router-dom";

import { connect } from "react-redux";
import { compose } from "redux";

import NavBar from "./Nav";

import HomePage from "./HomePage";
import { firestoreConnect } from "react-redux-firebase";
import NewQuestion from "./NewQuestion";
import SignPage from "./SignPage";

class App extends Component {
	render() {
		const { authError } = this.props;

		return (
			<div className="app">
				<Router>
					<React.Fragment>
						<NavBar authError={authError} />

						<div>
							<Route path="/" exact component={HomePage} />
							<Route path="/sign" component={SignPage} />
							<Route path="/new" exact component={NewQuestion} />
						</div>
					</React.Fragment>
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
