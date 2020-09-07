import React from 'react';
import configureStore from 'redux-mock-store'; //ES6 modules
import thunk from 'redux-thunk';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import '@testing-library/jest-dom';
import { login } from '../../actions/auth';
import { AppRouter } from './../../routers/AppRouter';
import { act } from '@testing-library/react';
import { firebase } from '../../firebase/firebaseConfig';

jest.mock('../../actions/auth', () => ({
	login: jest.fn(),
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initState = {
	auth: {},
	ui: { loading: false, msgError: null },
	notes: {
		notes: [],
		active: null,
	},
};
let store = mockStore(initState);
store.dispatch = jest.fn();

// beforeEach(() => {
// 	store = mockStore(initState);
// 	store.dispatch = jest.fn();
// 	jest.clearAllMocks();
// });

describe('Pruebas en el App Router', () => {
	test('debe de llamar al login si estoy auteticado', async () => {
		let user;

		await act(async () => {
			const UserCred = await firebase
				.auth()
				.signInWithEmailAndPassword('test@testing.com', '123456');
			// user = UserCred.user;
			const wrapper = mount(
				<Provider store={store}>
					<MemoryRouter>
						<AppRouter />
					</MemoryRouter>
				</Provider>
			);
		});

		expect(login).toHaveBeenCalledWith('HLDJvNPcL2d6MER70PUWnys59R13', null);
	});
});
