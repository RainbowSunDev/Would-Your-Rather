import React, { Component } from "react";
import { connect } from "react-redux";
import { vote } from "../actions/questions";
class Question extends Component {
	constructor(props) {
		super(props);
		this.state = {
			optionOneChecked: false,
			optionTwoChecked: false,
		};
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
		const { optionOneChecked } = this.state;
		const { id } = this.props.question;
		const { authedUid } = this.props;

		let option;
		if (optionOneChecked === true) {
			option = "optionOne";
		} else {
			option = "optionTwo";
		}

		this.props.vote(id, option, authedUid);
	};
	pollContent(
		optionTwoChecked,
		optionOneText,
		optionOneChecked,
		optionTwoText,
		answered,
		totalVotes,
		optionOneVotes,
		optionTwoVotes
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
					<label htmlFor="option1">
						{optionOneText}
						<pre>
							{Math.round(
								((optionOneVotes.length / totalVotes) * 100 + Number.EPSILON) *
									100
							) / 100}
							%
						</pre>
					</label>
				</div>
				<div
					style={{
						textAlign: "left",
						fontFamily: "Rubik",
						color: "rgba(255, 255, 255, 0.734)",
						fontSize: "16px",
					}}
				>
					option one took {optionOneVotes.length} out of {totalVotes} votes
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
					<label htmlFor="option2">
						{optionTwoText}
						<pre>
							{Math.round(
								((optionTwoVotes.length / totalVotes) * 100 + Number.EPSILON) *
									100
							) / 100}
							%
						</pre>
					</label>
				</div>
				<div
					style={{
						textAlign: "left",
						fontFamily: "Rubik",
						color: "rgba(255, 255, 255, 0.734)",
						fontSize: "16px",
					}}
				>
					option two took {optionTwoVotes.length} out of {totalVotes} votes
				</div>
				<pre
					className="row"
					style={{
						fontSize: "18px",
						color: "rgba(255, 255, 255, 0.934)",
						fontFamily: "Roboto",
						marginTop: "2vh",
						textTransform: "uppercase",
						textAlign: "center",
						marginLeft: "60px",
					}}
				>
					you voted for
					{answered === "optionOne" ? (
						<div> option one</div>
					) : (
						<div> option two</div>
					)}
				</pre>
			</form>
		);
	}
	render() {
		const { question, users } = this.props;

		if (question && users) {
			const questionUID = question.uid;
			const {
				author,
				id,
				optionOneText,
				optionTwoText,
				optionOneVotes,
				optionTwoVotes,
			} = question;
			const { answers, avatarURL } = users[questionUID];
			const { optionOneChecked, optionTwoChecked } = this.state;

			const answered = Object.keys(answers).includes(id) ? answers[id] : false;
			const totalVotes = optionOneVotes.length + optionTwoVotes.length;
			return (
				<div className="poll-voting-container">
					{answered && <h1>Results</h1>}

					<div className="row">
						<img src={avatarURL} alt={"avatar"} className="avatars" />
						{answered ? <h2>Asked by {author}</h2> : <h2>{author} Asks</h2>}
					</div>
					{!answered ? (
						<div>
							<span>Would You Rather.. </span>

							{this.pollContent(
								optionTwoChecked,
								optionOneText,
								optionOneChecked,
								optionTwoText,
								answered,
								totalVotes,
								optionOneVotes,
								optionTwoVotes
							)}
						</div>
					) : (
						<div>
							<div>
								<h2>would you rather..</h2>

								{this.pollContent(
									optionTwoChecked,
									optionOneText,
									optionOneChecked,
									optionTwoText,
									answered,
									totalVotes,
									optionOneVotes,
									optionTwoVotes
								)}
							</div>
						</div>
					)}
				</div>
			);
		} else {
			return <div>Fetching Data</div>;
		}
	}
}

const mapStateToProps = (state, props) => {
	const { question_id } = props.match.params;

	const uid = state.firebase.auth.uid;
	if (uid !== null)
		return {
			authedUid: uid,
			users:
				state.firestore.data.users !== undefined
					? state.firestore.data.users
					: null,
			question:
				state.firestore.data.questions !== undefined
					? state.firestore.data.questions[question_id]
					: null,
		};
};
const mapDispatchToProps = (dispatch) => {
	return {
		vote: (qid, voting, authedUid) => dispatch(vote(qid, voting, authedUid)),
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(Question);
