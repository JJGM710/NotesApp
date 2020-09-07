import React, { useEffect } from 'react';
// import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

export const PublicRoute = ({ isLoggedin, componente: Component, ...rest }) => {
	useEffect(() => {
		// console.log('Public route montado');
		return () => {
			// console.log('Public Router desmontado');
		};
	}, []);
	// console.log('Public route se llamo');
	return (
		<Route
			{...rest}
			render={(props) => (!isLoggedin ? <Component /> : <Redirect to="/" />)}
		></Route>
	);
};

// PublicRoute.propTypes = {
// 	isLoggedin: PropTypes.bool.isRequired,
// 	component: PropTypes.func.isRequired,
// };
