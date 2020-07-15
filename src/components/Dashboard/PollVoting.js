import React, { Component } from "react";
import "./poll_vote.scss";
import "./poll_vote.css";
class PollVoting extends Component {
	constructor(props) {
		super(props);
		this.state = { optionOneChecked: true, optionTwoChecked: true };
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
	render() {
		const {
			author,
			uid,
			id,
			optionOne,
			optionTwo,
			timestamp,
		} = this.props.selectedQuestion;
		const { optionOneChecked, optionTwoChecked } = this.state;
		console.log(this.state);
		return (
			<div className="poll-voting-container">
				<h2>{author}</h2>
				<span>Would You Rather.. </span>
				<form className="form">
					<div className="inputGroup">
						<input
							id="option1"
							name="option1"
							type="checkbox"
							disabled={optionTwoChecked === false}
							onClick={this.toggleOption1Checked}
						/>
						<label htmlFor="option1">{optionOne.text}</label>
					</div>

					<div className="inputGroup">
						<input
							id="option2"
							name="option2"
							type="checkbox"
							onClick={this.toggleOption2Checked}
							disabled={optionOneChecked === false}
						/>
						<label htmlFor="option2">{optionTwo.text}</label>
					</div>
				</form>
			</div>
		);
	}
}
export default PollVoting;
