import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import { AuthRouter } from './AuthRouter';
import { JournalScreen } from '../components/journal/JournalScreen';
import { firebase } from '../firebase/firebaseConfig';
import { useDispatch } from 'react-redux';
import { login } from '../actions/auth';
import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';
// import { removeError } from '../actions/ui';
import { startLoadingNotes, startLoadingEntries } from './../actions/notes';

export const AppRouter = () => {
	const dispatch = useDispatch();
	// const { redirect } = useSelector((state) => state.ui);
	// console.log(redirect);
	const [checking, setChecking] = useState(true);
	const [isLoggedin, setIsLoggedin] = useState(false);

	//activar para recibir mensaje en el redirect
	const [hasLogout, setHasLogout] = useState(false);

	//pruebas de re renders en los hijos
	// const [show, setShow] = useState(false);

	//pruebas de re renders
	// const handleShow = () => {
	// 	setShow(!show);
	// };

	useEffect(() => {
		firebase.auth().onAuthStateChanged(async (user) => {
			if (user?.uid) {
				dispatch(login(user.uid, user.displayName));
				dispatch(startLoadingEntries(user.uid));
				dispatch(startLoadingNotes(user.uid));
				setIsLoggedin(true);
				//mensaje cuando hace redirect
				setHasLogout(true);
			} else {
				setIsLoggedin(false);
				//mensajes cuando hace redirect
				setHasLogout(false);
			}
			setChecking(false);
		});
		//unsuscribe
	}, [dispatch, setChecking]);

	if (checking) {
		return <h1>Espere.....</h1>;
	}

	return (
		<>
			{/* prueba de re renders en hijos  */}
			{/* <div>
				<button type="button" onClick={handleShow}>
					Show
				</button>
			</div> */}
			<Router>
				<div>
					<Switch>
						<PublicRoute
							isLoggedin={isLoggedin}
							path="/auth"
							componente={AuthRouter}
						></PublicRoute>
						<PrivateRoute
							isLoggedin={isLoggedin}
							//activa para cocndicional del mensaje de redirect
							hasLogout={hasLogout}
							exact
							path="/"
							componente={JournalScreen}
						></PrivateRoute>

						{/* <Route path="/auth" component={AuthRouter} /> */}
						{/* <Route exact path="/" component={JournalScreen} /> */}
						<Redirect to="/auth/login" />
					</Switch>
				</div>
			</Router>
		</>
	);
};
