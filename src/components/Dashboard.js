import React from "react";

import { connect } from "react-redux";

class Dashboard extends React.Component {
	render() {
		const { questions } = this.props;

		console.log("__DASHBOARD__", questions);
		return <div></div>;
	}
}

export default connect()(Dashboard);
