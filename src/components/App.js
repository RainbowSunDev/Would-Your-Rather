import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";
/* import { handleInitialData } from "../actions/shared";
 */ import { connect } from "react-redux";
import { compose } from "redux";

import NavBar from "./Nav";

import HomePage from "./HomePage";
import { firestoreConnect } from "react-redux-firebase";
class App extends Component {
	componentDidMount() {
		/* 		this.props.dispatch(handleInitialData());
		 */ console.log("store", this.props);
	}

	render() {
		const { authUser } = this.props;

		return (
			<div className="app">
				<Router>
					<NavBar authUser={authUser} />

					{authUser !== null && <HomePage users={this.props.users} />}
				</Router>
			</div>
		);
	}
}

function mapStateToProps(state) {
	console.log(state);
	return {
		users: state.firestore.data.users,
	};
}
export default compose(
	connect(mapStateToProps),
	firestoreConnect([{ collection: "users" }])
)(App);
