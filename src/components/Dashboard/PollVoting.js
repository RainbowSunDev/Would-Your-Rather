import React, { Component } from "react";
import { vote } from "../../actions/questions";

import "./poll_vote.scss";
import "./poll_vote.css";
import { connect } from "react-redux";
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
	render() {
		const {
			author,
			uid,
			id,
			optionOneText,
			optionTwoText,
			timestamp,
		} = this.props.selectedQuestion;
		const { optionOneChecked, optionTwoChecked } = this.state;
		console.log(this.state);
		return (
			<div className="poll-voting-container">
				<h2>{author} Asks</h2>
				<span>Would You Rather.. </span>
				<form className="form">
					<div className="inputGroup">
						<input
							id="option1"
							name="option1"
							type="checkbox"
							disabled={optionTwoChecked === true}
							onClick={this.toggleOption1Checked}
						/>
						<label htmlFor="option1">{optionOneText}</label>
					</div>

					<div className="inputGroup">
						<input
							id="option2"
							name="option2"
							type="checkbox"
							onClick={this.toggleOption2Checked}
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
			</div>
		);
	}
}
const mapStateToProps = (state) => {
	console.log("__THE STATE OF THE VOTING CMP", state);
	const uid = state.firebase.auth.uid;
	return {
		loggedInUser: uid,
	};
};
const mapDispatchToProps = (dispatch) => {
	return {
		vote: (qid, voting, loggedInUser) =>
			dispatch(vote(qid, voting, loggedInUser)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(PollVoting);
