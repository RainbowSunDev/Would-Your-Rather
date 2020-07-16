import React, { Component } from "react";
import { vote } from "../../actions/questions";
import { firestoreConnect } from "react-redux-firebase";
import { Pie, Doughnut } from "react-chartjs-2";

import "./poll_vote.scss";
import "./poll_vote.css";
import { connect } from "react-redux";
import { compose } from "redux";

class PollVoting extends Component {
	constructor(props) {
		super(props);
		this.state = { optionOneChecked: false, optionTwoChecked: false };
	}
	toggleOption1Checked = () => {
		this.setState((prevState) => {
			return { optionOneChecked: !prevState.optionOneChecked };
		});
	};
	toggleOption2Checked = () => {
		this.setState((prevState) => {
			return { optionTwoChecked: !prevState.optionTwoChecked };
		});
	};
	handleVoting = (e) => {
		e.preventDefault();
		console.log("__HANDLE__VOTING___", this.props);
		const { optionOneChecked } = this.state;
		const { id } = this.props.selectedQuestion;
		const { loggedInUser } = this.props;

		let option;
		if (optionOneChecked === true) {
			option = "optionOne";
		} else {
			option = "optionTwo";
		}

		this.props.vote(id, option, loggedInUser);
	};

	unansweredPolls(
		optionTwoChecked,
		optionOneText,
		optionOneChecked,
		optionTwoText,
		answered
	) {
		console.log(answered);
		return (
			<form className="form">
				<div className="inputGroup">
					<input
						id="option1"
						name="option1"
						type="checkbox"
						disabled={optionTwoChecked === true || answered}
						onChange={this.toggleOption1Checked}
						checked={answered === "optionOne"}
					/>
					<label htmlFor="option1">{optionOneText}</label>
				</div>

				<div className="inputGroup">
					<input
						id="option2"
						name="option2"
						type="checkbox"
						onChange={this.toggleOption2Checked}
						disabled={optionOneChecked === true || answered}
						checked={answered === "optionTwo"}
					/>
					<label htmlFor="option2">{optionTwoText}</label>
				</div>
				<button
					type="submit"
					className="add-new-poll vote-btn"
					disabled={optionOneChecked === optionTwoChecked || answered}
					onClick={this.handleVoting}
				>
					VOTE
				</button>
			</form>
		);
	}

	render() {
		const {
			author,
			id,
			optionOneText,
			optionTwoText,
			optionOneVotes,
			optionTwoVotes,
		} = this.props.selectedQuestion;
		const { authedUid, userAnswers } = this.props;
		const { optionOneChecked, optionTwoChecked } = this.state;

		console.log(this.props);
		const answered = Object.keys(userAnswers).includes(id)
			? userAnswers[id]
			: false;
		const state = {
			labels: ["Option 1", "Option 2"],
			datasets: [
				{
					backgroundColor: ["#FE2F57", "#97DAC7"],

					data: [optionOneVotes.length, optionTwoVotes.length],
				},
			],
		};
		return (
			<div className="poll-voting-container">
				<div>
					<h2>{author} Asks</h2>
					<span>Would You Rather.. </span>

					{this.unansweredPolls(
						optionTwoChecked,
						optionOneText,
						optionOneChecked,
						optionTwoText,
						answered
					)}
				</div>

				<Pie
					className={"pie-chart"}
					width={"400px"}
					height={"220px"}
					data={state}
					options={{
						pieStartAngle: 100,
						pieSliceText: "label",
						responsive: true,
						legend: {
							position: "right",
							color: "#FFF",
						},
					}}
				/>
			</div>
		);
	}
}
const mapStateToProps = (state) => {
	console.log("__THE STATE OF THE VOTING CMP", state);
	const uid = state.firebase.auth.uid;
	return {
		authedUid: uid,
		userAnswers: state.firestore.data.users[uid].answers,
	};
};
const mapDispatchToProps = (dispatch) => {
	return {
		vote: (qid, voting, loggedInUser) =>
			dispatch(vote(qid, voting, loggedInUser)),
	};
};

export default compose(
	connect(mapStateToProps, mapDispatchToProps),
	firestoreConnect([{ collection: "users" }])
)(PollVoting);
