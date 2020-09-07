import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';
// import { logout } from '../actions/auth';
import { redirectError } from './../actions/ui';

export const PrivateRoute = ({
	isLoggedin,
	hasLogout,
	componente: Component,
	...rest
}) => {
	// console.log(rest.location.search);
	// localStorage.setItem(
	// 	'lastPath',
	// 	rest.location.pathname + rest.location.search
	// );
	// console.log(rest);
	const dispatch = useDispatch();
	// console.log('Private Router se llamo');

	//activar para creaar mensaje de error del redirect
	useEffect(() => {
		// console.log('Private router montado');
		if (hasLogout === false) {
			dispatch(redirectError());
		}
		return () => {
			// console.log('Private route demontado');
		};
		// eslint-disable-next-line
	}, []);

	return (
		<Route
			{...rest}
			render={(props) =>
				isLoggedin ? <Component {...props} /> : <Redirect to="/auth/login" />
			}
		></Route>
	);
};

PrivateRoute.propTypes = {
	isLoggedin: PropTypes.bool.isRequired,
	componente: PropTypes.func.isRequired,
};
