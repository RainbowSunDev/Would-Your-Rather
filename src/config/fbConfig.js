import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
	apiKey: "AIzaSyBxJxfId2y5Hyjw6KxTOZk1ke4ETbb3IkI",
	authDomain: "would-your-rather-b4031.firebaseapp.com",
	databaseURL: "https://would-your-rather-b4031.firebaseio.com",
	projectId: "would-your-rather-b4031",
	storageBucket: "would-your-rather-b4031.appspot.com",
	messagingSenderId: "34686369419",
	appId: "1:34686369419:web:a96d7a8de3ce671c4bde8e",
	measurementId: "G-L7Y5TMHEP2",
};
firebase.initializeApp(config);
//firebase.firestore().settings({ timestampsInSnapshots: true });

export default firebase;
