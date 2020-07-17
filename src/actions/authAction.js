let defaultAvatars = ["https://i.ibb.co/8cWd0BC/avatar6.jpg"];

export const signIn = (credentials) => {
	return (dispatch, getState, { getFirebase }) => {
		const firebase = getFirebase();

		firebase
			.auth()
			.signInWithEmailAndPassword(credentials.email, credentials.password)
			.then(() => {
				dispatch({ type: "LOGIN_SUCCESS" });
			})
			.catch((err) => {
				dispatch({ type: "LOGIN_ERROR", err });
			});
	};
};

export const signOut = () => {
	return (dispatch, getState, { getFirebase }) => {
		const firebase = getFirebase();

		firebase
			.auth()
			.signOut()
			.then(() => {
				dispatch({ type: "SIGNOUT_SUCCESS" });
			});
	};
};

export const signUp = (newUser) => {
	return (dispatch, getState, { getFirebase, getFirestore }) => {
		const firebase = getFirebase();
		const firestore = getFirestore();

		firebase
			.auth()
			.createUserWithEmailAndPassword(newUser.email, newUser.password)
			.then((resp) => {
				return firestore
					.collection("users")
					.doc(resp.user.uid)
					.set({
						fname: newUser.fname,
						username: newUser.username,
						answers: {},
						questions: [],
						avatarURL:
							defaultAvatars[Math.floor(Math.random() * defaultAvatars.length)],
					});
			})
			.then(() => {
				dispatch({ type: "SIGNUP_SUCCESS" });
			})

			.catch((err) => {
				dispatch({ type: "SIGNUP_FAILED", err });
			});
	};
};
