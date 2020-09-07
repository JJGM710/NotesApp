import configureStore from 'redux-mock-store'; //ES6 modules
import thunk from 'redux-thunk';
import '@testing-library/jest-dom';
import { login, logout, startRegister } from '../../actions/auth';
import { types } from './../../types/types';
import { startLogout, startLogin } from './../../actions/auth';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
window.scrollTo = jest.fn();

const initState = {};

let store = mockStore(initState);

describe('Pruebas con las acciones de auth', () => {
	beforeEach(() => {
		store = mockStore(initState);
	});
	test('login y logout deben crear la accion respectiva', () => {
		store.dispatch(login('TESTING_UID', 'JUAN'));
		store.dispatch(logout());
		const logina = store.getActions();
		// console.log(logina);
		expect(logina[0].type).toBe(types.login);
		expect(logina[1].type).toBe(types.logout);
	});

	test('debe realizar el StartLogout', async () => {
		await store.dispatch(startLogout());

		const actions = store.getActions();

		expect(actions[0].type).toBe(types.uiSetError);

		//asi se evalua las acciones que solo llaman a otros dispatch
		// hay uqe verificar que el tipo de accion sea el correcto
	});

	test('debe de iniciar el startLoginWithEmail&Pass', async () => {
		await store.dispatch(startLogin('test@testing.com', '123456'));

		const actions = store.getActions();
		expect(actions[1]).toEqual({
			type: types.login,
			payload: {
				uid: 'HLDJvNPcL2d6MER70PUWnys59R13',
				displayName: null,
			},
		});
	});

	test('Debe hacer el registrer', async () => {
		await store.dispatch(startRegister('Juan', 'juang@email.com', '123456'));

		const actions = store.getActions();

		//se podria pobrar con el error de que el usuario ya existe pero no es de mayor importancia
	});
});
