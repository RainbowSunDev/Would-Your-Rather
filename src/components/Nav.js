import React from "react";

import { NavLink } from "react-router-dom";

export default function NavBar() {
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
						Sign in
					</NavLink>
				</li>
			</ul>
		</nav>
	);
}
