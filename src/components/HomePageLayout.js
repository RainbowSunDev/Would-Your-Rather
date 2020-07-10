import React, { Component } from "react";

class HomePageLayout extends Component {
	render() {
		return (
			<div className="home-page column font-rubrik">
				<div className="column">
					<h1 className="title">Would You Rather?</h1>
					<p className="description font-rubrik">
						Click any text to edit or style it. Select text to insert a link.
						<br />
						Click blue "Gear" icon in the top right corner to hide/show buttons,
						<br />
						Click red "+" in the bottom right corner to add a new block.
						<br /> Use the top left menu to create new pages, sites and add
						themes.
					</p>
					<div className="row">
						<button className="sign font-rubrik"> Sign up</button>
						<button
							className="sign font-rubrik border-width"
							onClick={() => this.openModal()}
						>
							Login
						</button>
					</div>
				</div>
			</div>
		);
	}
}
export default HomePageLayout;
