import React from "react";

import { FaPoll } from "react-icons/fa";
import { RiCloseLine } from "react-icons/ri";

import Poll from "./Poll";
import "./dashboard.css";
import { NavLink } from "react-router-dom";
import PollVoting from "./PollVoting";

class Dashboard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			openPoll: false,
			selectedQuestion: {},
			questions: Object.values(this.props.questions),
			wantedQuestions: Object.values(this.props.questions),
		};
	}
	componentDidMount() {
		this.handleWantedPolls("unanswered");
	}
	openPollHandler = (question) => {
		this.setState({ openPoll: true, selectedQuestion: question });
	};
	onClosePoll = () => {
		this.setState({ openPoll: false });
	};
	handleReceiveData = (questions) => {
		this.setState({ questions: questions });
	};
	handleWantedPolls = (target) => {
		const currentUserAnswers = Object.keys(this.props.authedUser.answers);
		const currentUserQuestions = this.props.authedUser.questions;
		let wantedQuestions;
		if (target === "answered") {
			wantedQuestions = this.state.questions.filter((question) =>
				currentUserAnswers.includes(question.id)
			);
		} else if (target === "unanswered") {
			wantedQuestions = this.state.questions.filter(
				(question) => !currentUserAnswers.includes(question.id)
			);
		} else if (target === "myPolls") {
			wantedQuestions = this.state.questions.filter((question) =>
				currentUserQuestions.includes(question.id)
			);
		}
		this.setState({ openPoll: false, wantedQuestions: wantedQuestions });
	};

	render() {
		const { openPoll, selectedQuestion, wantedQuestions } = this.state;
		const { users } = this.props;
		console.log(this.state);
		return (
			<div className="dashboard">
				<div className="dashboard-container">
					<ul className="dashboard-menu">
						<h2>Dashboard</h2>
						<NavLink to="/add" className="add-new-poll">
							<FaPoll size="28px" />
							<div>New Poll</div>
						</NavLink>
						<li onClick={() => this.handleWantedPolls("myPolls")}>My Polls</li>
						<li onClick={() => this.handleWantedPolls("answered")}>
							Answered Polls
						</li>
						<li onClick={() => this.handleWantedPolls("unanswered")}>
							Unanswered Polls
						</li>
						<li> Favorites</li>
					</ul>
					<ul className="questions-list">
						{wantedQuestions.map((question) => (
							<li
								key={question.id}
								onClick={() => this.openPollHandler(question)}
							>
								<Poll
									question={question}
									avatarURL={users[question.uid].avatarURL}
								/>
							</li>
						))}
					</ul>

					{openPoll && (
						<div className="poll-vote">
							<RiCloseLine className={"icon"} onClick={this.onClosePoll} />
							<PollVoting selectedQuestion={selectedQuestion} />
						</div>
					)}
				</div>
			</div>
		);
	}
}
export default Dashboard;
