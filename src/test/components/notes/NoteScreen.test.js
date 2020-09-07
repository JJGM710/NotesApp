import React from 'react';
import configureStore from 'redux-mock-store'; //ES6 modules
import thunk from 'redux-thunk';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import '@testing-library/jest-dom';
import { activeNote } from '../../../actions/notes';
import { NoteScreen } from './../../../components/notes/NoteScreen';

jest.mock('../../../actions/notes', () => ({
	activeNote: jest.fn(),
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initState = {
	auth: { uid: '1', name: 'JuanJose' },
	ui: { loading: false, msgError: null },
	notes: {
		notes: [],
		active: { id: 1234, title: 'hola', body: 'body', date: 0 },
		config: 2,
	},
};
let store = mockStore(initState);
store.dispatch = jest.fn();

const wrapper = mount(
	<Provider store={store}>
		<NoteScreen />
	</Provider>
);
describe('Pruebas en NoteScreen', () => {
	test('debe mostrarse correctamente', () => {
		expect(wrapper).toMatchSnapshot();
	});

	test('debe de disparar el active note', () => {
		wrapper.find('input[name="title"]').simulate('change', {
			target: {
				name: 'title',
				value: 'Hola de nuevo',
			},
		});

		expect(activeNote).toHaveBeenLastCalledWith(1234, {
			body: 'body',
			title: 'Hola de nuevo',
			id: 1234,
			date: 0,
		});
	});
});
