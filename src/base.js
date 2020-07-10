import Rebase from "re-base";
import firebase from "firebase";
var config = {
	apiKey: "AIzaSyCuSnP_SZn20fDgzuvX_iyOj-u292XRF8k",
	authDomain: "would-you-rather-3269c.firebaseapp.com",
	databaseURL: "https://would-you-rather-3269c.firebaseio.com",
	projectId: "would-you-rather-3269c",
	storageBucket: "would-you-rather-3269c.appspot.com",
	messagingSenderId: "1099380704180",
	appId: "1:1099380704180:web:0946a2de265d0d82cae8e1",
	measurementId: "G-JTPSBP1VCE",
};

const app = firebase.initializeApp(config);
const base = Rebase.createClass(app.database());

export { base };
