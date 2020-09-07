import React from 'react';
import configureStore from 'redux-mock-store'; //ES6 modules
import thunk from 'redux-thunk';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import '@testing-library/jest-dom';
import { JournalEntry } from './../../../components/journal/JournalEntry';
import { activeNote } from './../../../actions/notes';

jest.mock('./../../../actions/notes', () => ({
	activeNote: jest.fn(),
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initState = {};
let store = mockStore(initState);
store.dispatch = jest.fn();

const nota = {
	title: 'titulo',
	body: 'cuerpo',
	url: 'www.images.com/some.jps',
	id: 123,
	date: 0,
};

const wrapper = mount(
	<Provider store={store}>
		<JournalEntry {...nota} />
	</Provider>
);

describe('Pruebas en JournalEntry', () => {
	test('debe mostrarse correctamente', () => {
		expect(wrapper).toMatchSnapshot();
	});

	test('debe de activar la nota', () => {
		wrapper.find('.journal__entry').simulate('click');

		expect(activeNote).toHaveBeenCalledWith(123, {
			body: 'cuerpo',
			date: 0,
			title: 'titulo',
			update: undefined,
			url: 'www.images.com/some.jps',
		});
	});
});
