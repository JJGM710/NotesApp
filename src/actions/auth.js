import { types } from './../types/types';
import { firebase } from '../firebase/firebaseConfig';
import { googleAuthProvider } from '../firebase/firebaseConfig';
import {
	setError,
	finishLoading,
	startLoading,
	removeRedirectError,
} from './ui';
import Swal from 'sweetalert2';
import { noteLogout } from './notes';

export const startLogin = (email, password) => {
	return (dispatch) => {
		dispatch(startLoading());
		return firebase
			.auth()
			.signInWithEmailAndPassword(email, password)
			.then(({ user }) => {
				dispatch(login(user.uid, user.displayName));
				// dispatch(removeError());
				dispatch(finishLoading());
				Swal.fire('Logeed IN!', 'User Auth Correct', 'success');
			})
			.catch((e) => {
				// dispatch(setError(e.message));
				Swal.fire('Error', e.message, 'error');
				dispatch(finishLoading());
			});
	};
};

export const startRegister = (name, email, password) => {
	return (dispatch) => {
		dispatch(startLoading());
		return firebase
			.auth()
			.createUserWithEmailAndPassword(email, password)
			.then(async ({ user }) => {
				await user.updateProfile({ displayName: name });
				console.log(user.displayName);
				dispatch(login(user.uid, user.displayName));
				dispatch(finishLoading());
			})
			.catch((e) => {
				dispatch(finishLoading());
				Swal.fire('Error', e.message, 'error');
			});
	};
};

export const startGoogleLogin = () => {
	return (dispatch) => {
		firebase
			.auth()
			.signInWithPopup(googleAuthProvider)
			.then(({ user }) => {
				dispatch(login(user.uid, user.displayName));
			});
	};
};

export const login = (uid, displayName) => {
	return {
		type: types.login,
		payload: {
			uid,
			displayName,
		},
	};
};

export const startLogout = () => {
	return async (dispatch) => {
		dispatch(setError('Has cerrado sesion'));
		await firebase.auth().signOut();
		dispatch(removeRedirectError());
		dispatch(logout());
		dispatch(noteLogout());
	};
};

export const logout = () => ({
	type: types.logout,
});
