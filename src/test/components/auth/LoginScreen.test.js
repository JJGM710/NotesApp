import React from 'react';
import configureStore from 'redux-mock-store'; //ES6 modules
import thunk from 'redux-thunk';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import '@testing-library/jest-dom';
import { LoginScreen } from './../../../components/auth/LoginScreen';
import { MemoryRouter } from 'react-router-dom';
import { startGoogleLogin, startLogin } from './../../../actions/auth';

jest.mock('./../../../actions/auth', () => ({
	startGoogleLogin: jest.fn(),
	startLogin: jest.fn(),
}));

// jest.mock('./../../../actions/auth', () => ({
// 	startLogin: jest.fn(),
// }));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
window.scrollTo = jest.fn();

const initState = {
	auth: {},
	ui: { loading: false, msgError: null },
};

let store = mockStore(initState);
store.dispatch = jest.fn();

beforeEach(() => {
	store = mockStore(initState);
	jest.clearAllMocks();
});

describe('Pruebas en LoginScreen', () => {
	const wrapper = mount(
		<Provider store={store}>
			<MemoryRouter>
				<LoginScreen />
			</MemoryRouter>
		</Provider>
	);
	test('Debe renderizar el componente correctamente', () => {
		expect(wrapper).toMatchSnapshot();
	});

	test('Debe renderizar el componente correctamente', () => {
		wrapper.find('.google-btn').simulate('click');
		expect(startGoogleLogin).toHaveBeenCalled();
	});

	test('debe de disparar el start login con los respectivos argumentos', () => {
		const handleLogin = wrapper.find('form').prop('onSubmit');
		handleLogin({ preventDefault: () => {} });
		expect(startLogin).toHaveBeenCalledWith('', '');
	});
});
