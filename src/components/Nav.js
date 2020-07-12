import React from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { signOut } from "../actions/authAction";

class NavBar extends React.Component {
	render() {
		const { isLoggedIn } = this.props;
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
					{isLoggedIn ? (
						<React.Fragment>
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
									to="/"
									exact
									activeClassName="active"
									className="signin"
									onClick={this.props.signOut}
								>
									Logout
								</NavLink>
							</li>
						</React.Fragment>
					) : (
						<React.Fragment>
							<li>
								<NavLink to="/about" exact activeClassName="active">
									About
								</NavLink>
							</li>
							<li>
								<NavLink to="/signin" exact activeClassName="active">
									Sign in
								</NavLink>
							</li>
						</React.Fragment>
					)}
				</ul>
			</nav>
		);
	}
}
const mapStateToProps = (state) => {
	return {
		isLoggedIn: !state.firebase.auth.isEmpty,
	};
};
const mapDispatchToProps = (dispatch) => {
	return {
		signOut: () => dispatch(signOut()),
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
