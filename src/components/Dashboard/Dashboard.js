import React from "react";
import { connect } from "react-redux";
import { FaPoll } from "react-icons/fa";

import Poll from "./Poll";
import "./dashboard.css";
import { NavLink } from "react-router-dom";

class Dashboard extends React.Component {
	render() {
		let questions = this.props.questions;
		console.log("__DASHBOARD__", this.props.questions);

		if (questions === undefined) {
			return <div>a7a</div>;
		} else {
			questions = Object.values(questions);
			console.log(questions);

			return (
				<div>
					<h2>Dashboard</h2>

					<div className="dashboard-container">
						<ul className="dashboard-menu">
							<NavLink to="/new" className="add-new-poll">
								<FaPoll size="28px" />
								<div>New Poll</div>
							</NavLink>
							<li> My Polls</li>
						</ul>
						<ul className="questions-list">
							{questions.map((question) => (
								<li key={question.id}>
									<Poll question={question} />
								</li>
							))}
						</ul>
					</div>
				</div>
			);
		}
	}
}
export default connect()(Dashboard);
