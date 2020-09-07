import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from './../../hooks/useForm';
import validator from 'validator';
import { useDispatch, useSelector } from 'react-redux';
import { setError, removeError, removeRedirectError } from './../../actions/ui';
import { startRegister } from '../../actions/auth';

export const RegisterScreen = React.memo(() => {
	const dispatch = useDispatch();
	const { loading } = useSelector((state) => state.ui);

	const { formValues, handleInputChange } = useForm({
		name: 'Juan',
		email: 'juangiler7@outlook.com',
		password: '123456',
		password2: '123456',
	});

	const { name, email, password, password2 } = formValues;

	//activar papra eliminar el error del redirect cuando entre a registro
	// useEffect(() => {
	// 	dispatch(removeRedirectError());
	// }, [dispatch]);

	//manejo de mensajes con la pantalla de login screen

	useEffect(() => {
		dispatch(removeRedirectError());
		dispatch(removeError());
		return () => {
			dispatch(removeError());
		};
	}, [dispatch]);

	const handleRegister = (e) => {
		e.preventDefault();
		// console.log(name, email, password, password2);
		if (isFormValid()) {
			dispatch(startRegister(name, email, password));
		}
	};

	const isFormValid = () => {
		if (name.trim().length === 0) {
			dispatch(setError('Name is Required'));
			return false;
		} else if (!validator.isEmail(email)) {
			dispatch(setError('Enter valid Email'));
			return false;
		} else if (password !== password2 || password.length < 5) {
			dispatch(setError('Password Should be at 6 and match'));
			return false;
		}
		dispatch(removeError());
		return true;
	};
	/*
		{
			name: 'Juan'
			email: 'juangiler7@outlook.com'
			password: 123
			password2: 123
		}
		userForm

		const handleRegister 
		recibo el evento
		imprimir valores actualizados en click
	*/

	return (
		<>
			<h3 className="auth__title">Register</h3>

			<form
				onSubmit={handleRegister}
				className="animate__animated animate__fadeInUp animate__faster"
			>
				<input
					type="text"
					placeholder="Name"
					name="name"
					className="auth__input mt-5"
					value={name}
					onChange={handleInputChange}
				/>
				<input
					type="text"
					placeholder="Email"
					name="email"
					className="auth__input mt-5"
					value={email}
					onChange={handleInputChange}
				/>
				<input
					type="password"
					placeholder="Password"
					name="password"
					className="auth__input mt-5"
					autoComplete="current-password"
					value={password}
					onChange={handleInputChange}
				/>
				<input
					type="password"
					placeholder="Confirm Password"
					name="password2"
					className="auth__input mt-5"
					autoComplete="off"
					value={password2}
					onChange={handleInputChange}
				/>
				<button
					type="submit"
					className="btn btn-primary btn-block mt-1 mb-5"
					disabled={loading}
				>
					Register
				</button>

				<Link to="/auth/login" className="link">
					Already registered?
				</Link>
			</form>
		</>
	);
});
