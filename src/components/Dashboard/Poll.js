import React from "react";
import { formatDate } from "../../apis/_DATA";

import { connect } from "react-redux";
import "./poll.css";

class Poll extends React.Component {
	render() {
		const {
			author,
			id,
			optionOne,
			optionTwo,
			timestamp,
			uid,
		} = this.props.question;
		const date = formatDate(timestamp);
		const total_votes = optionOne.votes.length + optionTwo.votes.length;
		console.log("__POLLS__", this.props.question);
		return (
			<div className="item-container">
				<img src="/avatar1.jpg" alt="img" className="question-author-avatar" />

				<div className="poll-container">
					<span className="author-name">{author}</span>
					<span className="poll-date">{date}</span>
					<span className="votes">voted {total_votes} users</span>
				</div>
			</div>
		);
	}
}

export default connect()(Poll);
