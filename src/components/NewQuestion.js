import React, { Component } from "react";
import { connect } from "react-redux";
import addNewQuestion from "../actions/questions";
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
		this.setState(() => ({
			optionOne: "",
			optionTwo: "",
		}));
	};
	render() {
		const { optionOne, optionTwo } = this.state;

		return (
			<div>
				<form onSubmit={this.handleSubmit}>
					<textarea
						placeholder="Option One"
						value={optionOne}
						className="textarea"
						onChange={this.handleOptionOneChange}
						maxLength={280}
					></textarea>
					<textarea
						placeholder="Option Two"
						value={optionTwo}
						className="textarea"
						onChange={this.handleOptionTwoChange}
						maxLength={280}
					></textarea>

					<button
						className="btn2"
						type="submit"
						disabled={optionOne === "" || optionTwo === ""}
					>
						Add Question
					</button>
				</form>
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
