import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { LoginScreen } from '../components/auth/LoginScreen';
import { RegisterScreen } from '../components/auth/RegisterScreen';
import { useSelector } from 'react-redux';

export const AuthRouter = React.memo(() => {
	const { msgError } = useSelector((state) => state.ui);
	const { redirect } = useSelector((state) => state.ui);
	// console.log('Auth router se llamo');
	return (
		<div className="auth__main">
			<div className="auth__box-container">
				{msgError && <div className="auth__alert-info">{msgError}!</div>}
				{redirect && (
					<div className="auth__alert-error">Debe iniciar sesion primero!</div>
				)}
				<Switch>
					<Route path="/auth/login" render={() => <LoginScreen />} />
					<Route path="/auth/register" render={() => <RegisterScreen />} />
					<Redirect to="/auth/login" />
				</Switch>
			</div>
		</div>
	);
});
