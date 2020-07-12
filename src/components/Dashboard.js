import React from "react";
import { firestoreConnect } from "react-redux-firebase";
import { connect } from "react-redux";
import { compose } from "redux";

class Dashboard extends React.Component {
	render() {
		const { questions } = this.props;

		console.log("__DASHBOARD__", questions);
		return <div></div>;
	}
}

function mapStateToProps(state) {
	return {
		questions: state.firestore.data.questions,
	};
}
export default connect()(Dashboard);
/* 	connect(mapStateToProps),
	firestoreConnect([{ collection: "questions" }]) */
