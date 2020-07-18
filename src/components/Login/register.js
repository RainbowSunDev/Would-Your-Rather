/* Register.jsx */
import React from "react";
import loginImg from "../../assets/login.svg";
import { connect } from "react-redux";
import { signUp } from "../../actions/authAction";

class Register extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			email: "",
			password: "",
			username: "",
			fname: "",
		};
	}
	handleFName = (e) => {
		this.setState({ fname: e.target.value });
	};
	handleUsername = (e) => {
		this.setState({ username: e.target.value });
	};
	handleEmail = (e) => {
		this.setState({ email: e.target.value });
	};
	handlePassword = (e) => {
		this.setState({ password: e.target.value });
	};
	handleSubmit = (e) => {
		this.props.signUp(this.state);

		this.setState({ email: "", password: "", username: "", fname: "" });
	};
	render() {
		const { email, password, fname, username } = this.state;

		return (
			<div className="base-container" ref={this.props.containerRef}>
				<div className="header">Register</div>
				<div className="content">
					<div className="image">
						<img src={loginImg} alt="logo" />
					</div>
					<div className="form">
						<div className="form-group">
							<label htmlFor="fullname">Full Name</label>
							<input
								type="text"
								name="fullname"
								onChange={this.handleFName}
								value={fname}
							/>
						</div>
						<div className="form-group">
							<label htmlFor="username">Username</label>
							<input
								type="text"
								name="username"
								onChange={this.handleUsername}
								value={username}
							/>
						</div>
						<div className="form-group">
							<label htmlFor="email">Email</label>
							<input
								type="text"
								name="email"
								value={email}
								onChange={this.handleEmail}
							/>
						</div>
						<div className="form-group">
							<label htmlFor="password">Password</label>
							<input
								type="password"
								name="password"
								value={password}
								onChange={this.handlePassword}
							/>
						</div>
					</div>
				</div>
				<div className="footer">
					<button
						type="button"
						className="btn-sign"
						onClick={this.handleSubmit}
					>
						Register
					</button>
				</div>
			</div>
		);
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		signUp: (newUser) => dispatch(signUp(newUser)),
	};
};
export default connect(null, mapDispatchToProps)(Register);
