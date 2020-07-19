/* import React, { Component } from "react";
import { vote } from "../../actions/questions";
import { firestoreConnect } from "react-redux-firebase";
import { Pie } from "react-chartjs-2";
import Collapsible from "react-collapsible";

import { connect } from "react-redux";
import { compose } from "redux";

class PollVoting extends Component {
	constructor(props) {
		super(props);
		this.state = {
			optionOneChecked: false,
			optionTwoChecked: false,
		};
	}
	toggleOption1Checked = () => {
		console.log("a7a");
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
		const { optionOneChecked } = this.state;
		const { id } = this.props.selectedQuestion;
		const { authedUid } = this.props;

		let option;
		if (optionOneChecked === true) {
			option = "optionOne";
		} else {
			option = "optionTwo";
		}

		this.props.vote(id, option, authedUid);
	};

	unansweredPolls(
		optionTwoChecked,
		optionOneText,
		optionOneChecked,
		optionTwoText,
		answered
	) {
		return answered === false ? (
			<form className="form">
				<div className="inputGroup">
					<input
						style={{ cursor: "pointer" }}
						id="option1"
						name="option1"
						type="checkbox"
						onClick={this.toggleOption1Checked}
						disabled={optionTwoChecked === true}
					/>
					<label htmlFor="option1">{optionOneText}</label>
				</div>

				<div className="inputGroup">
					<input
						id="option2"
						name="option2"
						type="checkbox"
						onChange={this.toggleOption2Checked}
						disabled={optionOneChecked === true}
					/>
					<label htmlFor="option2">{optionTwoText}</label>
				</div>
				<button
					type="submit"
					className="add-new-poll vote-btn"
					disabled={optionOneChecked === optionTwoChecked}
					onClick={this.handleVoting}
				>
					VOTE
				</button>
			</form>
		) : (
			<form className="form">
				<div className="inputGroup">
					<input
						id="option1"
						name="option1"
						type="checkbox"
						onChange={this.toggleOption1Checked}
						checked={answered === "optionOne"}
						disabled={true}
					/>
					<label htmlFor="option1">{optionOneText}</label>
				</div>

				<div className="inputGroup">
					<input
						id="option2"
						name="option2"
						type="checkbox"
						onChange={this.toggleOption2Checked}
						checked={answered === "optionTwo"}
						disabled={true}
					/>
					<label htmlFor="option2">{optionTwoText}</label>
				</div>
				<div
					style={{ "font-size": "14px", color: "rgba(255, 255, 255, 0.734)" }}
				>
					you have already answered this question
				</div>
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
		const { userAnswers } = this.props;
		const { optionOneChecked, optionTwoChecked } = this.state;

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
				{answered && (
					<Collapsible
						className="collapse-result"
						openedClassName="collapse-result"
						trigger="Show Results"
						triggerWhenOpen="Hide Results"
						triggerTagName="button"
					>
						<Pie
							width={"400px"}
							height={"220px"}
							data={state}
							title="Poll Result"
							options={{
								pieStartAngle: 100,
								pieSliceText: "label",
								responsive: true,
								legend: {
									position: "left",
									color: "#FFF",
								},
							}}
						/>
					</Collapsible>
				)}
			</div>
		);
	}
}
const mapStateToProps = (state) => {
	const uid = state.firebase.auth.uid;

	return {
		authedUid: uid,
		userAnswers: state.firestore.data.users[uid].answers,
	};
};
const mapDispatchToProps = (dispatch) => {
	return {
		vote: (qid, voting, authedUid) => dispatch(vote(qid, voting, authedUid)),
	};
};
 */
/* export default compose(
	connect(mapStateToProps, mapDispatchToProps),
	firestoreConnect([{ collection: "users" }])
)(PollVoting);
 */
