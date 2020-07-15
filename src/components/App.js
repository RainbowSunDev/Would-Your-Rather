import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";

import NavBar from "./Nav";
import HomePage from "./HomePage";
import NewQuestion from "./NewQuestion";
import SignPage from "./SignPage";

import Dashboard from "./Dashboard/Dashboard";

class App extends Component {
	render() {
		const { authError, questions } = this.props;
		console.log("___APP___", this.props);
		return (
			<div className="app">
				<Router>
					<React.Fragment>
						<NavBar authError={authError} />

						<div>
							<Route path="/" exact component={HomePage} />
							<Route path="/sign" component={SignPage} />
							<Route path="/new" exact component={NewQuestion} />
							<Route
								path="/dashboard"
								exact
								component={() => <Dashboard questions={questions} />}
							/>
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
