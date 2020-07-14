import React from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { signOut } from "../actions/authAction";

class NavBar extends React.Component {
	render() {
		const { isLoggedIn, profile } = this.props;
		console.log("NAV", this.props);
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
					{isLoggedIn === true ? (
						<React.Fragment>
							<li className="menu__group">
								<NavLink to="/new" exact className="menu__link">
									New Poll
								</NavLink>
							</li>
							<li className="menu__group">
								<NavLink to="/leaderboard" exact className="menu__link">
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
						</React.Fragment>
					) : (
						<li className="menu__group">
							<NavLink to="/sign" exact className="menu__link">
								Join us!
							</NavLink>
						</li>
					)}
				</ul>
			</nav>
		);
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
