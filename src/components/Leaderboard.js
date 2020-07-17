import React, { Component } from "react";
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

		this.setState({ topUsers: topUsers, loaded: true });
	}
	render() {
		const { topUsers, loaded } = this.state;
		const { users } = this.props;
		if (!loaded) return null;
		return (
			<div className="leaderboard font-rubrik">
				<h2>Leaderboard</h2>
				<ul className="top-users">
					<ul className="top-2 ">
						<li>✨ {users[topUsers[1]].username} ✨</li>
						<li>
							<img
								src={users[topUsers[1]].avatarURL}
								alt="avatar"
								className="avatar avatar-2"
							/>
						</li>
						<li>{users[topUsers[1]].fname}</li>
						<li>
							Score :{" "}
							{users[topUsers[1]].questions.length +
								Object.keys(users[topUsers[1]].answers).length}
						</li>
						<span style={{ fontSize: "40px" }}>🥈</span>
					</ul>
					<ul className="top-1">
						<li>✨ {users[topUsers[0]].username} ✨</li>
						<li>
							<img
								src={users[topUsers[0]].avatarURL}
								alt="avatar"
								className="avatar avatar-1"
							/>
						</li>
						<li>{users[topUsers[0]].fname}</li>
						<li>
							Score :{" "}
							{users[topUsers[0]].questions.length +
								Object.keys(users[topUsers[0]].answers).length}
						</li>
						<span style={{ fontSize: "40px" }}>🥇</span>
					</ul>
					<ul className="top-3">
						<li>✨ {users[topUsers[2]].username} ✨</li>
						<li>
							<img
								src={users[topUsers[2]].avatarURL}
								alt="avatar"
								className="avatar avatar-3"
							/>
						</li>
						<li>{users[topUsers[2]].fname}</li>
						<li>
							Score :{" "}
							{users[topUsers[2]].questions.length +
								Object.keys(users[topUsers[2]].answers).length}
						</li>
						<span style={{ fontSize: "40px" }}>🥉</span>
					</ul>
				</ul>
				<ul>
					{topUsers.map((user) => (
						<li key={user}>{users[user].fname}</li>
					))}
				</ul>
			</div>
		);
	}
}
export default Leaderboard;
