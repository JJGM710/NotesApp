import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from './../../hooks/useForm';
import { useDispatch, useSelector } from 'react-redux';
import { startLogin, startGoogleLogin } from './../../actions/auth';
import { removeError } from '../../actions/ui';

export const LoginScreen = React.memo(() => {
	const dispatch = useDispatch();
	const { loading } = useSelector((state) => state.ui);
	const { logout: estadolog } = useSelector((state) => state.auth);
	const [animate, setAnimate] = useState();

	useEffect(() => {
		setAnimate('animate__animated animate__fadeInUp animate__faster');
		return () => {
			if (estadolog === false) {
				dispatch(removeError());
			}
		};
	}, [dispatch, estadolog]);
	// console.log('Login Screen se llamo');

	const { formValues, handleInputChange } = useForm({
		email: '',
		password: '',
	});

	const { email, password } = formValues;

	const handleLogin = (e) => {
		e.preventDefault();
		console.log('login');
		dispatch(startLogin(email, password));
		// if (isloginValidationValid()) {
		// 	dispatch(startLogin(email, password));
		// }
	};

	const handleGoogleLogin = () => {
		// console.log('googlelogin');
		dispatch(startGoogleLogin());
	};

	// const isloginValidationValid = () => {
	// 	if (!validator.isEmail(email)) {
	// 		dispatch(setError('Invalid Email'));
	// 		return false;
	// 	}

	// return true;
	// };

	return (
		<>
			<h3 className="auth__title">Login</h3>
			<form onSubmit={handleLogin} className={animate}>
				<input
					type="text"
					placeholder="Email"
					name="email"
					autoComplete="off"
					className="auth__input"
					value={email}
					onChange={handleInputChange}
				/>
				<input
					type="password"
					placeholder="password"
					name="password"
					className="auth__input mt-3"
					autoComplete="current-password"
					value={password}
					onChange={handleInputChange}
				/>
				<button
					type="submit"
					className="btn btn-success btn-block mt-2"
					disabled={loading}
				>
					Login
				</button>

				<div className="auth__social-networks">
					<p>Login with Social Networks </p>

					<div className="google-btn" onClick={handleGoogleLogin}>
						<div className="google-icon-wrapper">
							<img
								className="google-icon"
								src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
								alt="google button"
							/>
						</div>
						<p className="btn-text">
							<b>Sign in with google</b>
						</p>
					</div>
				</div>
				<Link to="/auth/register" className="link">
					Create new account
				</Link>
			</form>
		</>
	);
});
