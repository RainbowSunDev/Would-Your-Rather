import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import NavBar from "./Nav";

class App extends Component {
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

export default App;
