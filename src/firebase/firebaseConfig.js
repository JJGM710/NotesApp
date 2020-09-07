import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
	apiKey: process.env.REACT_APP_APIKEY,
	authDomain: process.env.REACT_APP_AUTHDOMAIN,
	databaseURL: process.env.REACT_APP_DATABASEURL,
	projectId: process.env.REACT_APP_PROJECTID,
	storageBucket: process.env.REACT_APP_STORAGEBUCKET,
	messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
	appId: process.env.REACT_APP_APPID,
};

// const firebaseConfig = {
// 	apiKey: 'AIzaSyBz3QnOZZVyF0qlxFt3-KIlav6XgKhbiSk',
// 	authDomain: 'react-app-course-409ba.firebaseapp.com',
// 	databaseURL: 'https://react-app-course-409ba.firebaseio.com',
// 	projectId: 'react-app-course-409ba',
// 	storageBucket: 'react-app-course-409ba.appspot.com',
// 	messagingSenderId: '153096746563',
// 	appId: '1:153096746563:web:af7d96c53ce407f3d906f6',
// };

// const firebaseConfigTesting = {
// 	apiKey: 'AIzaSyCPan1TbmxyMQXcvOJGCog-k_o87nAG4QI',
// 	authDomain: 'react-app-testing-60027.firebaseapp.com',
// 	databaseURL: 'https://react-app-testing-60027.firebaseio.com',
// 	projectId: 'react-app-testing-60027',
// 	storageBucket: 'react-app-testing-60027.appspot.com',
// 	messagingSenderId: '615866014222',
// 	appId: '1:615866014222:web:2e42d0bb4cf13a8afdba5f',
// };

// if (process.env.NODE_ENV == 'test') {
// 	//testing

// 	firebase.initializeApp(firebaseConfigTesting);
// } else {
// 	//dev//prod
// }
// // Initialize Firebase

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore(); //esta es la base de datos
const googleAuthProvider = new firebase.auth.GoogleAuthProvider(); //auth provider con google

export { db, googleAuthProvider, firebase };
