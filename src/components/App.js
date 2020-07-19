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
import Leaderboard from "./Leaderboard";
import Question from "./Question";

class App extends Component {
	UNSAFE_componentWillMount() {}
	render() {
		const { authError, questions, users, uid } = this.props;
		return (
			<div className="app">
				<Router>
					<React.Fragment>
						<NavBar authError={authError} />
						<Route path="/sign" exact component={SignPage} />
						<div>
							{uid === undefined && (
								<Route path="/" exact component={HomePage} />
							)}
							{users !== undefined && (
								<Route
									path="/leaderboard"
									exact
									component={() => <Leaderboard users={users} uid={uid} />}
								/>
							)}

							<Route
								path="/add"
								exact
								component={() => <NewQuestion uid={uid} />}
							/>
							<Route
								path="/questions/:question_id"
								exact
								component={Question}
							/>
							{questions !== undefined &&
								users !== undefined &&
								uid !== undefined && (
									<Route
										path="/"
										exact
										component={() => (
											<Dashboard
												questions={questions}
												authedUser={users[uid]}
												users={users}
												uid={uid}
											/>
										)}
									/>
								)}
						</div>
					</React.Fragment>
				</Router>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		uid: state.firebase.auth.uid,
		users: state.firestore.data.users,
		authError: state.authUser.authError,
		questions: state.firestore.data.questions,
	};
}
export default compose(
	connect(mapStateToProps),
	firestoreConnect([
		{ collection: "users" },
		{ collection: "questions", orderBy: ["timestamp", "desc"] },
	])
)(App);
