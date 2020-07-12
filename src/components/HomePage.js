import React, { Component } from "react";
import { connect } from "react-redux";
import ReactModalLogin from "react-modal-login";
import { facebookConfig, googleConfig } from "../API/social-config";

import { signIn, signUp } from "../actions/authAction";

class HomePage extends Component {
	constructor(props) {
		super(props);

		this.state = {
			showModal: false,
			loggedIn: null,
			loading: false,
			error: null,
			initialTab: null,
			recoverPasswordSuccess: null,
		};
	}

	onLogin() {
		console.log("__onLogin__");
		console.log("email: " + document.querySelector("#email").value);
		console.log("password: " + document.querySelector("#password").value);

		const email = document.querySelector("#email").value;
		const password = document.querySelector("#password").value;

		if (!email || !password) {
			this.setState({
				error: true,
			});
		} else {
			this.onLoginSuccess("form");
		}

		this.props.signIn({ email, password });
	}

	onRegister() {
		console.log("__onRegister__");
		console.log("login: " + document.querySelector("#login").value);
		console.log("email: " + document.querySelector("#email").value);
		console.log("password: " + document.querySelector("#password").value);

		const login = document.querySelector("#login").value;
		const email = document.querySelector("#email").value;
		const password = document.querySelector("#password").value;
		const fullName = document.querySelector("#full-name").value;

		if (!login || !email || !password) {
			this.setState({
				error: true,
			});
		} else {
			this.onLoginSuccess("form");
		}
		this.props.signUp({
			email: email,
			password: password,
			fname: fullName,
			username: login,
		});
	}

	onRecoverPassword() {
		console.log("__onFotgottenPassword__");
		console.log("email: " + document.querySelector("#email").value);

		const email = document.querySelector("#email").value;

		if (!email) {
			this.setState({
				error: true,
				recoverPasswordSuccess: false,
			});
		} else {
			this.setState({
				error: null,
				recoverPasswordSuccess: true,
			});
		}
	}

	openModal(initialTab) {
		this.setState(
			{
				initialTab: initialTab,
			},
			() => {
				this.setState({
					showModal: true,
				});
			}
		);
	}

	onLoginSuccess(method, response) {
		this.closeModal();
		this.setState({
			loggedIn: method,
			loading: false,
		});
	}

	onLoginFail(method, response) {
		this.setState({
			loading: false,
			error: response,
		});
	}

	startLoading() {
		this.setState({
			loading: true,
		});
	}

	finishLoading() {
		this.setState({
			loading: false,
		});
	}

	afterTabsChange() {
		this.setState({
			error: null,
			recoverPasswordSuccess: false,
		});
	}

	closeModal() {
		this.setState({
			showModal: false,
			error: null,
		});
	}

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
						<button
							className="sign font-rubrik"
							onClick={() => this.openModal("register")}
						>
							Sign up
						</button>
						<button
							className="sign font-rubrik border-width"
							onClick={() => this.openModal("login")}
						>
							Sign in
						</button>
					</div>
				</div>
			</div>
		);
	}
	render() {
		const isLoading = this.state.loading;
		/* 		const { authError } = this.props;
		 */ return (
			<div>
				{this.pageLayout()}
				<ReactModalLogin
					visible={this.state.showModal}
					onCloseModal={this.closeModal.bind(this)}
					loading={isLoading}
					initialTab={this.state.initialTab}
					error={this.state.error}
					tabs={{
						afterChange: this.afterTabsChange.bind(this),
					}}
					startLoading={this.startLoading.bind(this)}
					finishLoading={this.finishLoading.bind(this)}
					form={{
						onLogin: this.onLogin.bind(this),
						onRegister: this.onRegister.bind(this),
						onRecoverPassword: this.onRecoverPassword.bind(this),

						recoverPasswordSuccessLabel: this.state.recoverPasswordSuccess
							? {
									label: "New password has been sent to your mailbox!",
							  }
							: null,
						recoverPasswordAnchor: {
							label: "Forgot your password?",
						},
						loginBtn: {
							label: "Sign in",
						},
						registerBtn: {
							label: "Sign up",
						},
						recoverPasswordBtn: {
							label: "Send new password",
						},
						loginInputs: [
							{
								containerClass: "RML-form-group",
								label: "Email/Username",
								type: "email",
								inputClass: "RML-form-control",
								id: "email",
								name: "email",
							},
							{
								containerClass: "RML-form-group",
								label: "Password",
								type: "password",
								inputClass: "RML-form-control",
								id: "password",
								name: "password",
							},
						],
						registerInputs: [
							{
								containerClass: "RML-form-group",
								label: "Username",
								type: "text",
								inputClass: "RML-form-control",
								id: "login",
								name: "login",
								placeholder: "@yourfavtrutle",
							},
							{
								containerClass: "RML-form-group",
								label: "Full Name",
								type: "text",
								inputClass: "RML-form-control",
								id: "full-name",
								name: "Name",
								placeholder: "i.e. Michael Angello",
							},
							{
								containerClass: "RML-form-group",
								label: "Email",
								type: "email",
								inputClass: "RML-form-control",
								id: "email",
								name: "email",
								placeholder: "i.e. michaelangello@gmail.com",
							},
							{
								containerClass: "RML-form-group",
								label: "Password",
								type: "password",
								inputClass: "RML-form-control",
								id: "password",
								name: "password",
								placeholder: "must be at least 8 characters",
							},
						],
						recoverPasswordInputs: [
							{
								containerClass: "RML-form-group",
								label: "Email",
								type: "email",
								inputClass: "RML-form-control",
								id: "email",
								name: "email",
								placeholder: "Email",
							},
						],
					}}
					separator={{
						label: "or",
					}}
					providers={{
						facebook: {
							config: facebookConfig,
							onLoginSuccess: this.onLoginSuccess.bind(this),
							onLoginFail: this.onLoginFail.bind(this),
							inactive: isLoading,
							label: "Continue with Facebook",
						},
						google: {
							config: googleConfig,
							onLoginSuccess: this.onLoginSuccess.bind(this),
							onLoginFail: this.onLoginFail.bind(this),
							inactive: isLoading,
							label: "Continue with Google",
						},
					}}
				/>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		authError: state.authUser.authError,
	};
};
const mapDispatchToProps = (dispatch) => {
	return {
		signIn: (creds) => dispatch(signIn(creds)),
		signUp: (newUser) => dispatch(signUp(newUser)),
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
