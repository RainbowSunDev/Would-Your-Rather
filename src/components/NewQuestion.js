import React, { Component } from "react";
import { connect } from "react-redux";
import addNewQuestion from "../actions/questions";
import Game from "../assets/Game.jpeg";
class NewQuestion extends Component {
	state = {
		optionOne: "",
		optionTwo: "",
	};

	handleOptionOneChange = (event) => {
		const optionOne = event.target.value;
		this.setState(() => ({ optionOne: optionOne }));
	};
	handleOptionTwoChange = (event) => {
		console.log(this.state);
		const optionTwo = event.target.value;
		this.setState({ optionTwo: optionTwo });
	};

	handleSubmit = (e) => {
		e.preventDefault();

		//TODO Add it to the tweets
		const { uid, profile, addNewQuestion } = this.props;
		const { optionOne, optionTwo } = this.state;
		/* 		dispatch(handleAddTweet(text, id));
        
		 */

		addNewQuestion({
			author: profile.fname,
			optionOneText: optionOne,
			optionTwoText: optionTwo,
			uid: uid,
		});
		setInterval(
			() =>
				this.setState(() => ({
					optionOne: "",
					optionTwo: "",
				})),
			1000
		);
	};
	render() {
		const { optionOne, optionTwo } = this.state;

		return (
			<div className="col">
				{/* 				<img src={Game} width="70%" alt="" className="photo" />
				 */}
				{/* 				<form onSubmit={this.handleSubmit} className="form-container">
				 */}{" "}
				{/* <header className="form-title">Create New Poll Now!</header>
					<header className="subtitle">
						Add new poll and let your friend choose.
					</header>
					<header className="font-rubrik">Would you rather ..</header> */}
				{/* <input
						placeholder="Option One"
						value={optionOne}
						className="textarea font-rubrik"
						onChange={this.handleOptionOneChange}
						maxLength={280}
					></input>
					<header className="pad-bottom font-rubrik">OR</header>
					<input
						placeholder="Option Two"
						value={optionTwo}
						className="textarea font-rubrik"
						onChange={this.handleOptionTwoChange}
						maxLength={280}
					></input> */}
				<h1 className="form-title">Would You Rather..</h1>
				<form>
					<input
						type="text"
						name="name"
						className="question"
						id="nme"
						value={optionOne}
						required
						autocomplete="off"
						onChange={this.handleOptionOneChange}
					/>
					<label for="nme">
						<span>option one?</span>
					</label>
					<textarea
						name="message"
						rows="2"
						className="question"
						id="msg"
						value={optionTwo}
						required
						autocomplete="off"
						onChange={this.handleOptionTwoChange}
					></textarea>
					<label for="msg">
						<span className="option">option two?</span>
					</label>
				</form>
				{/* 	<button
					className="form-button"
					type="submit"
					disabled={optionOne === "" || optionTwo === ""}
				> */}
				<div class="button_container">
					<button
						class="btn"
						onClick={this.handleSubmit}
						disabled={optionOne === "" || optionTwo === ""}
					>
						<span>SEND POLL!</span>
					</button>
				</div>
				{/* 	Add Question
				</button> */}
				{/* 				</form>
				 */}{" "}
			</div>
		);
	}
}
const mapStateToProps = (state) => {
	return {
		uid: state.firebase.auth.uid,
		profile: state.firebase.profile,
	};
};
const mapDispatchToProps = (dispatch) => {
	return {
		addNewQuestion: (question) => dispatch(addNewQuestion(question)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(NewQuestion);
