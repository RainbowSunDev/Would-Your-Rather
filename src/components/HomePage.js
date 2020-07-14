import React, { Component } from "react";
import { connect } from "react-redux";

class HomePage extends Component {
	openSignPage = () => {
		this.props.history.push("/sign");
	};

	pageLayout() {
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
						<button className="sign font-rubrik" onClick={this.openSignPage}>
							Sign up
						</button>
						<button
							className="sign font-rubrik border-width"
							onClick={this.openSignPage}
						>
							Sign in
						</button>
					</div>
				</div>
			</div>
		);
	}
	render() {
		/* 		const { authError } = this.props;
		 */ return <div>{this.pageLayout()}</div>;
	}
}

export default connect()(HomePage);
