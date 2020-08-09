import React, { Component } from "react";
import crown from "../assets/crown.svg";
import { MdStar } from "react-icons/md";
import { Redirect } from "react-router-dom";

class Leaderboard extends Component {
	constructor(props) {
		super(props);
		this.state = { topUsers: [], loaded: false };
	}
	componentDidMount() {
		const { users } = this.props;
		var topUsers;

		topUsers = Object.keys(users).sort(function (a, b) {
			const total_b =
				users[b].questions.length + Object.keys(users[b].answers).length;

			const total_a =
				users[a].questions.length + Object.keys(users[a].answers).length;

			return total_b - total_a;
		});

		this.setState({ topUsers: topUsers.slice(0, 5), loaded: true });
	}
	render() {
		const { topUsers, loaded } = this.state;
		const { users, uid } = this.props;
		if (!loaded) return null;
		if (uid === undefined) {
			alert("You must login first to access this page");
			return <Redirect to="sign" />;
		}
		return (
			<div className="leaderboard">
				<ul className="users-list">
					{topUsers.map((user, index) => (
						<div className="signle-user" key={user}>
							<header>
								<header className="index">#{index + 1}</header>
								<img
									src={users[user].avatarURL}
									alt={"avatar"}
									className="avatars"
								/>
								<div className="user-info">
									<li key={user}>{users[user].fname}</li>
									<li
										className="user-name"
										style={{
											fontSize: "1.2vw",
											color: "#222",
											fontWeight: "300",
										}}
									>
										@{users[user].username}
									</li>
								</div>
							</header>
							<div
								className="score"
								style={{
									fontSize: "1.8vw",
									color: "#222e",
									fontFamily: "Roboto",
								}}
							>
								<div className="answered">
									<span style={{ marginBottom: "10px" }}>ANSWERED</span>
									<span>{Object.keys(users[user].answers).length}</span>
								</div>
								<div className="answered">
									<span style={{ marginBottom: "10px" }}>CREATED</span>
									<span>{users[user].questions.length}</span>
								</div>
								<MdStar className="star" />
								<div>
									{" "}
									{users[user].questions.length +
										Object.keys(users[user].answers).length}
								</div>
							</div>
						</div>
					))}
				</ul>
				<div className="top-user">
					<header>
						TOP <span>USER</span>
					</header>
					<img src={crown} alt={"crown"} className="crown" />
					<img
						src={users[topUsers[0]].avatarURL}
						alt="avatar"
						className="avatar"
					/>
					<div className="fname"> {users[topUsers[0]].fname}</div>
					<div className="user-name"> @{users[topUsers[0]].username}</div>
					<div className="score">
						<MdStar className="star" />{" "}
						{users[topUsers[0]].questions.length +
							Object.keys(users[topUsers[0]].answers).length}
					</div>
				</div>
			</div>
		);
	}
}
export default Leaderboard;
