import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { handleInitialData } from "../actions/shared";
import { connect } from "react-redux";

import NavBar from "./Nav";

class App extends Component {
	componentDidMount() {
		console.log(this.props);
		this.props.dispatch(handleInitialData());
	}
	render() {
		return (
			<div className="app">
				<Router>
					<NavBar />
				</Router>
			</div>
		);
	}
}

export default connect()(App);
