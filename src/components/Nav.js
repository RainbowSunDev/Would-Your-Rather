import React from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { signOut } from "../actions/authAction";

class NavBar extends React.Component {
	render() {
		const { isLoggedIn, profile } = this.props;
		console.log("NAV", profile);
		return (
			<nav className="menu">
				<ul className="menu__list">
					<li className="menu__group">
						<NavLink to="/" exact className="logo">
							WYR?
						</NavLink>
					</li>
					<li className="menu__group">
						<NavLink to="/" exact className="menu__link">
							Home
						</NavLink>
					</li>
					<li className="menu__group">
						<NavLink to="/" exact className="menu__link">
							New Poll
						</NavLink>
					</li>
					<li className="menu__group">
						<NavLink to="/" exact className="menu__link">
							Leaderboard
						</NavLink>
					</li>
					<li className="menu__group">
						<NavLink
							to="/"
							exact
							className="menu__link"
							onClick={this.props.signOut}
						>
							Hello, {profile.username}
						</NavLink>
					</li>
				</ul>
			</nav>
		);
		{
			/* <nav className="nav">
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
									Hello, {profile.username}
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
			</nav> */
		}
	}
}
const mapStateToProps = (state) => {
	console.log(state);
	return {
		isLoggedIn: !state.firebase.auth.isEmpty,
		profile: state.firebase.profile,
	};
};
const mapDispatchToProps = (dispatch) => {
	return {
		signOut: () => dispatch(signOut()),
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
