import React from 'react';
import configureStore from 'redux-mock-store'; //ES6 modules
import thunk from 'redux-thunk';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import '@testing-library/jest-dom';
import { LoginScreen } from './../../../components/auth/LoginScreen';
import { MemoryRouter } from 'react-router-dom';
import { startRegister } from './../../../actions/auth';
import { RegisterScreen } from './../../../components/auth/RegisterScreen';
import {
	setError,
	removeRedirectError,
	removeError,
} from './../../../actions/ui';

jest.mock('./../../../actions/ui', () => ({
	setError: jest.fn(),
	removeError: jest.fn(),
	removeRedirectError: jest.fn(),
}));

jest.mock('./../../../actions/auth', () => ({
	startRegister: jest.fn(),
}));

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
const wrapper = mount(
	<Provider store={store}>
		<MemoryRouter>
			<RegisterScreen />
		</MemoryRouter>
	</Provider>
);

describe('Pruebas en Register Screen', () => {
	test('Debe renderizar correctamente', () => {
		expect(wrapper).toMatchSnapshot();
	});

	// test('debe mostrar el error', () => {
	// 	wrapper.find('form').simulate('submit');

	// 	expect(setError).toHaveBeenCalledWith('Name is Required');
	// });

	test('Debe hacer el registrer', () => {
		const emailField = wrapper.find('input').at(1);

		emailField.simulate('change', {
			target: {
				name: emailField.prop('name'),
				value: '',
			},
		});

		wrapper.find('form').simulate('submit');

		expect(setError).toHaveBeenCalledWith('Enter valid Email');
	});

	test('Debe de hacer el register', () => {
		const emailField = wrapper.find('input').at(1);

		emailField.simulate('change', {
			target: {
				name: emailField.prop('name'),
				value: 'juangiler7@outlook.com',
			},
		});

		wrapper.find('form').simulate('submit');

		expect(startRegister).toHaveBeenCalled();
	});

	// test('debe mostrar la caja de error cuando se hace setError', () => {

	//     //esta prueba deberia hacerse en el authrouter porque movi la caja de errores ahi!!!!

	// })
});
