/* login.jsx */
import React from "react";
import { connect } from "react-redux";
import loginImg from "../../assets/login.svg";
import "./formstyle.scss";
import { signIn } from "../../actions/authAction";

class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			email: "",
			password: "",
		};
	}
	handleEmail = (e) => {
		this.setState({ email: e.target.value });
	};
	handlePassword = (e) => {
		this.setState({ password: e.target.value });
	};
	handleSubmit = (e) => {
		console.log("logging in ", this.state);
		this.props.signIn(this.state);

		this.setState({ email: "", password: "" });
	};
	render() {
		const { email, password } = this.state;
		return (
			<div className="base-container" ref={this.props.containerRef}>
				<div className="header">Login</div>
				<div className="content">
					<div className="image">
						<img src={loginImg} alt="logo" />
					</div>
					<div className="form">
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
						Login
					</button>
				</div>
			</div>
		);
	}
}
const mapDispatchToProps = (dispatch) => {
	return {
		signIn: (creds) => dispatch(signIn(creds)),
	};
};
export default connect(null, mapDispatchToProps)(Login);
