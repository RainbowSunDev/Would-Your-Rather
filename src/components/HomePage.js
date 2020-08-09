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
					<p className="website-description">
						Would you rather is a website where you can play around with your
						friends,
						<br />
						You can post your own polls and answer your friends' ones.
						<br />
						Join us now and have fun with your friends.
					</p>

					<button className="sign font-rubrik" onClick={this.openSignPage}>
						JOIN US
					</button>
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
