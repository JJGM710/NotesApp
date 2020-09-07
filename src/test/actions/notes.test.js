import configureStore from 'redux-mock-store'; //ES6 modules
import thunk from 'redux-thunk';
import { startNewNote, startSaveNote } from '../../actions/notes';
import { types } from './../../types/types';
import { db } from '../../firebase/firebaseConfig';
import { startLoadingNotes, startUploading } from './../../actions/notes';
import { fileUpload } from './../../helpers/fileUpload';

jest.mock('./../../helpers/fileUpload', () => ({
	fileUpload: jest.fn(() => {
		return 'https://hola-mundo.com/cosa2.jpg';
	}),
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
window.scrollTo = jest.fn();

const initState = {
	auth: {
		uid: 'TESTING_UID',
	},
	notes: {
		active: {
			id: '6OXqeAyIo8HGvGIfpfwc',
			title: 'Hola',
			body: 'Mundo',
		},
	},
};

let store = mockStore(initState);

describe('Pruebas con las acciones de notes', () => {
	beforeEach(() => {
		store = mockStore(initState);
	});

	test('debe crear una nueva nota en starNewnote', async () => {
		await store.dispatch(startNewNote());
		//con get action se puede visialuzar que types se activaron al llamar una accion
		const actions = store.getActions();

		expect(actions[0]).toEqual({
			type: types.notesActive,
			payload: {
				id: expect.any(String),
				title: '',
				body: '',
				date: expect.any(Number),
				url: null,
				update: null,
			},
		});

		expect(actions[1]).toEqual({
			type: types.notesAddNew,
			payload: {
				id: expect.any(String),
				title: '',
				body: '',
				date: expect.any(Number),
				url: null,
				update: null,
			},
		});

		//

		const docId = actions[0].payload.id;
		// console.log(docId);
		await db.doc(`/TESTING_UID/journal/notes/${docId}`).delete();
	});

	test('startLoadingNotes debe cargar las notas', async () => {
		await store.dispatch(startLoadingNotes('TESTING_UID'));

		const actions = store.getActions();
		console.log(actions);

		expect(actions[0]).toEqual({
			type: types.notesLoad,
			payload: expect.any(Array),
		});

		const expected = {
			id: expect.any(String),
			title: expect.any(String),
			body: expect.any(String),
			date: expect.any(Number),
		};
		expect(actions[0].payload[0]).toMatchObject(expected);
	});

	test('startSaveNote debe de actualizar la nota', async () => {
		const note = {
			id: '6OXqeAyIo8HGvGIfpfwc',
			title: 'titulo',
			body: 'se actualizo de nuevo',
		};

		await store.dispatch(startSaveNote(note));

		const actions = store.getActions();
		expect(actions[0].type).toBe(types.notesUpdated);

		const docRef = await db.doc(`/TESTING_UID/journal/notes/${note.id}`).get();
		expect(docRef.data().title).toBe(note.title);
	});

	test('startUploading debe actualizar el url del entry', async () => {
		const file = new File([], 'foto.jpg');
		await store.dispatch(startUploading(file));

		const docRef = await db
			.doc(`/TESTING_UID/journal/notes/6OXqeAyIo8HGvGIfpfwc`)
			.get();
		expect(docRef.data().url).toBe('https://hola-mundo.com/cosa2.jpg');
	});
});
