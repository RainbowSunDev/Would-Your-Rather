import React from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import Collapsible from "react-collapsible";

import { signOut } from "../actions/authAction";

class NavBar extends React.Component {
	render() {
		const { isLoggedIn, profile } = this.props;
		return (
			<nav className="menu">
				<ul className="menu__list">
					<li className="menu__group">
						<NavLink to="/" exact className="logo">
							WYR?
						</NavLink>
					</li>

					{isLoggedIn === true ? (
						<React.Fragment>
							<li className="menu__group">
								<NavLink to="/" exact className="menu__link">
									Dashboard
								</NavLink>
							</li>
							<li className="menu__group">
								<NavLink to="/add" exact className="menu__link">
									New Poll
								</NavLink>
							</li>
							<li className="menu__group">
								<NavLink to="/leaderboard" exact className="menu__link">
									Leaderboard
								</NavLink>
							</li>
							<li className="menu__group">
								<Collapsible
									className="menu__group"
									trigger={`Hello, ${profile.fname}`}
									triggerClassName="menu__link collapse"
									openedClassName="menu__link collapse opened"
								>
									<NavLink
										to="/"
										exact
										className="menu__link"
										onClick={this.props.signOut}
									>
										Logout
									</NavLink>
								</Collapsible>
							</li>
						</React.Fragment>
					) : (
						<React.Fragment>
							<li className="menu__group">
								<NavLink to="/" exact className="menu__link">
									Home
								</NavLink>
							</li>
							<li className="menu__group">
								<NavLink to="/sign" exact className="menu__link">
									Join us!
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
		profile: state.firebase.profile,
	};
};
const mapDispatchToProps = (dispatch) => {
	return {
		signOut: () => dispatch(signOut()),
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
