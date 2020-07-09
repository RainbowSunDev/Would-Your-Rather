import React from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";

class NavBar extends React.Component {
	render() {
		const { name } = this.props;
		return (
			<nav className="nav">
				<ul>
					<li className="logo">
						<NavLink to="/">
							<div className="logo-text">WYR?</div>
						</NavLink>
					</li>
					<li>
						<NavLink to="/" exact activeClassName="active">
							Home
						</NavLink>
					</li>
					<li>
						<NavLink to="/add" exact activeClassName="active">
							New Question
						</NavLink>
					</li>
					<li>
						<NavLink to="/leader-board" exact activeClassName="active">
							Leaderboard
						</NavLink>
					</li>
					<li>
						<NavLink
							to="/signin"
							exact
							activeClassName="active"
							className="signin"
						>
							{name === null ? (
								<span>Sign in</span>
							) : (
								<span>Hello, {name}</span>
							)}
						</NavLink>
					</li>
				</ul>
			</nav>
		);
	}
}
function mapStateToProps({ authUser, users }) {
	const user = users[authUser];
	const name = null;
	if (user !== undefined) {
		const name = user.name.split(" ")[0];
		return { name };
	}

	return { name };
}
export default connect(mapStateToProps)(NavBar);
