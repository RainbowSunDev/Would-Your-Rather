import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, withRouter } from "react-router-dom";
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

		const { uid, profile, addNewQuestion } = this.props;
		const { optionOne, optionTwo } = this.state;
		addNewQuestion({
			author: profile.fname,
			optionOneText: optionOne,
			optionTwoText: optionTwo,
			uid: uid,
		});
		this.setState({ optionOne: "", optionTwo: "" });
		setTimeout(() => {
			this.props.history.push("/");
		}, 1000);
	};
	render() {
		const { optionOne, optionTwo } = this.state;
		const { uid } = this.props;
		if (uid === undefined) {
			alert("You must login first to access this page");
			return <Redirect to="sign" />;
		}

		return (
			<div className="col page-bkg">
				<h1 className="form-title">Would You Rather..</h1>
				<form>
					<input
						type="text"
						name="name"
						className="question"
						id="nme"
						value={optionOne}
						required
						autoComplete="off"
						onChange={this.handleOptionOneChange}
					/>

					<label htmlFor="nme">
						<span>option one?</span>
					</label>
					<textarea
						name="message"
						className="question"
						id="msg"
						value={optionTwo}
						required
						autoComplete="off"
						onChange={this.handleOptionTwoChange}
					></textarea>
					<label htmlFor="msg">
						<span className="option">option two?</span>
					</label>
				</form>

				<div className="button_container">
					<button
						className="btn"
						onClick={this.handleSubmit}
						disabled={optionOne === "" || optionTwo === ""}
					>
						<span>POST POLL!</span>
					</button>
				</div>
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
const NQ = withRouter(NewQuestion);

export default connect(mapStateToProps, mapDispatchToProps)(NQ);
