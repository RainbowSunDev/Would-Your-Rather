import React from "react";

import { FaPoll } from "react-icons/fa";

import Poll from "./Poll";

import { NavLink, withRouter } from "react-router-dom";

class Dashboard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedQuestion: {},
			questions: Object.values(this.props.questions),
			wantedQuestions: Object.values(this.props.questions),
		};
	}
	componentDidMount() {
		this.handleWantedPolls("unanswered");
	}
	openPollHandler = (e, question) => {
		this.props.history.push(`/questions/${question.id}`);
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
		this.setState({ wantedQuestions: wantedQuestions });
	};

	render() {
		const { wantedQuestions } = this.state;
		const { users } = this.props;
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
					</ul>
					<ul className="questions-list">
						{wantedQuestions.map((question) => (
							<li
								key={question.id}
								onClick={(e) => this.openPollHandler(e, question)}
							>
								<Poll
									question={question}
									avatarURL={users[question.uid].avatarURL}
								/>
							</li>
						))}
					</ul>
				</div>
			</div>
		);
	}
}
const DBwithRoute = withRouter(Dashboard);
export default DBwithRoute;
