import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { handleInitialData } from "../actions/shared";
import { connect } from "react-redux";

import NavBar from "./Nav";
import HomePage from "./HomePage";
class App extends Component {
	componentDidMount() {
		console.log(this.props);

		this.props.dispatch(handleInitialData());
	}
	render() {
		const { authUser } = this.props;
		return (
			<div className="app">
				<Router>
					<NavBar />
					{
						//authUser == null && <HomePage />}
						//TODO When Completing the sign in methods this will be the code
					}
					<HomePage />
				</Router>
			</div>
		);
	}
}
function mapStateToProps({ authUser }) {
	return { authUser };
}
export default connect(mapStateToProps)(App);
