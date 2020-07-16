import React from "react";
import { connect } from "react-redux";
import { FaPoll } from "react-icons/fa";

import Poll from "./Poll";
import "./dashboard.css";
import { NavLink } from "react-router-dom";
import PollVoting from "./PollVoting";

class Dashboard extends React.Component {
	constructor(props) {
		super(props);
		this.state = { openPoll: false, selectedQuestion: {} };
	}
	openPollHandler = (question) => {
		this.setState({ openPoll: true, selectedQuestion: question });
		console.log(this.state);
	};

	render() {
		let questions = this.props.questions;
		const { openPoll, selectedQuestion } = this.state;

		if (questions === undefined) {
			return <div>FETCHING DATA</div>;
		} else {
			questions = Object.values(questions);
			console.log(questions);

			return (
				<div className="dashboard">
					<div className="dashboard-container">
						<ul className="dashboard-menu">
							<h2>Dashboard</h2>
							<NavLink to="/new" className="add-new-poll">
								<FaPoll size="28px" />
								<div>New Poll</div>
							</NavLink>
							<li> My Polls</li>
							<li> Answered Polls</li>
							<li> Unanswered Polls</li>
							<li> Favorites</li>
						</ul>
						<ul className="questions-list">
							{questions.map((question) => (
								<li
									key={question.id}
									onClick={() => this.openPollHandler(question)}
								>
									<Poll question={question} />
								</li>
							))}
						</ul>
						{openPoll && (
							<div className="poll-vote">
								<PollVoting selectedQuestion={selectedQuestion} />
							</div>
						)}
					</div>
				</div>
			);
		}
	}
}
export default connect()(Dashboard);
