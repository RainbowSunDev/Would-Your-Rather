import React from "react";
import { formatDate } from "../../utlis/_DATA";

class Poll extends React.Component {
	render() {
		const {
			author,
			optionOneVotes,
			optionTwoVotes,
			timestamp,
		} = this.props.question;
		const { avatarURL } = this.props;
		const date = formatDate(timestamp);
		const total_votes = optionOneVotes.length + optionTwoVotes.length;

		return (
			<div className="item-container">
				<img src={avatarURL} alt="img" className="question-author-avatar" />

				<div className="poll-container">
					<span className="author-name">{author}</span>
					<span className="poll-date">{date}</span>
					{total_votes !== 0 ? (
						<span className="votes">
							{total_votes}
							{total_votes > 1 ? <span> users</span> : <span> user</span>} voted
							for this poll
						</span>
					) : (
						<span className="votes">become the first one to vote</span>
					)}
				</div>
			</div>
		);
	}
}

export default Poll;
