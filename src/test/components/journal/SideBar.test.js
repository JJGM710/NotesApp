import React from 'react';
import configureStore from 'redux-mock-store'; //ES6 modules
import thunk from 'redux-thunk';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import '@testing-library/jest-dom';
import { SideBar } from '../../../components/journal/SideBar';
import { startLogout } from './../../../actions/auth';
import { startNewNote } from './../../../actions/notes';

jest.mock('./../../../actions/auth', () => ({
	startLogout: jest.fn(),
}));

jest.mock('./../../../actions/notes', () => ({
	startNewNote: jest.fn(),
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initState = {
	auth: { uid: '1', name: 'JuanJose' },
	ui: { loading: false, msgError: null },
	notes: {
		notes: [],
		active: null,
		config: 2,
	},
};
let store = mockStore(initState);
store.dispatch = jest.fn();

describe('Pruebas en Sidebar', () => {
	const wrapper = mount(
		<Provider store={store}>
			<SideBar />
		</Provider>
	);
	test('debe mostrarse correctamente', () => {
		expect(wrapper).toMatchSnapshot();
	});

	test('debe llamar al startLogout', () => {
		wrapper.find('button').simulate('click');

		expect(startLogout).toHaveBeenCalled();
	});

	test('debe llamar el startNewNote', () => {
		wrapper.find('.journal__new-entry').simulate('click');

		expect(startNewNote).toHaveBeenCalled();
	});
});
