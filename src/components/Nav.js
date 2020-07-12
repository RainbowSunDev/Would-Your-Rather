import React from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";

class NavBar extends React.Component {
	render() {
		const { authError } = this.props;
		console.log(authError);
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
							{authError === null ? <span>Sign in</span> : <span>Logout</span>}
						</NavLink>
					</li>
				</ul>
			</nav>
		);
	}
}
function mapStateToProps(state) {
	return {
		authError: state.authUser.authError,
	};
}
export default connect(mapStateToProps)(NavBar);
