import { db } from '../firebase/firebaseConfig';
import { types } from './../types/types';
import { loadNotes } from './../helpers/loadNotes';
import Swal from 'sweetalert2';
import { loadEntries } from './../helpers/loadEntries';
import { fileUpload } from './../helpers/fileUpload';

//accion asincrona que crea una nueva nota y luego hace el dispatch para que se active una nota, y se empiezan
// a cargar las nuevas entradas
export const startNewNote = () => {
	return async (dispatch, getState) => {
		const uid = getState().auth.uid;
		const newNote = {
			title: '',
			body: '',
			date: new Date().getTime(),
			url: null,
			update: null,
		};

		try {
			const doc = await db.collection(`${uid}/journal/notes`).add(newNote);
			dispatch(activeNote(doc.id, newNote));
			dispatch(startLoadingEntries(uid));
			dispatch(addNote(doc.id, newNote));
		} catch (error) {
			console.log(error);
		}

		// console.log(doc);
	};
};

//Carga las notas  y las coloca en el state del redux
export const startLoadingNotes = (uid) => {
	return async (dispatch, getState) => {
		const note = await loadNotes(uid);
		dispatch(setNotes(note));
	};
};

//carga el numero de entraddas que hay direectmaen desde la base de datos
//se puede optimizar para que sea lalmada de StartLoadingNotes
export const startLoadingEntries = (uid) => {
	return async (dispatch, getState) => {
		const entradas = await loadEntries(uid);
		dispatch(setEntry(entradas));
		console.log(entradas);
	};
};

//guarda la nota y hace el dispatch de refresh note para cambiar las propiedades de esa nota modificada
export const startSaveNote = (note) => {
	return async (dispatch, getState) => {
		const uid = getState().auth.uid;
		const { active: activeNote } = getState().notes;

		if (!note.url) {
			delete note.url;
		}

		const noteToFirestore = { ...note };
		delete noteToFirestore.id;
		//asignacion de propiedad para update y mandar a actualizar en la base de datos
		noteToFirestore.update = new Date().getTime();

		await db.doc(`${uid}/journal/notes/${note.id}`).update(noteToFirestore);
		//asignacion a la variable local luego de que se realizo el save en la base de datos
		activeNote.update = noteToFirestore.update;

		//se hace el refresh para que las  notas se actualicen con los nuevos cambios

		dispatch(refreshNote(note.id, noteToFirestore));
		Swal.fire('Saved', note.title, 'success');
	};
};

export const startUploading = (file) => {
	return async (dispatch, getState) => {
		const { active: activeNote } = getState().notes;

		Swal.fire({
			title: 'Uploading....',
			text: 'Please wait...',
			allowOutsideClick: false,
			onBeforeOpen: () => {
				Swal.showLoading();
			},
		});

		const fileUrl = await fileUpload(file);

		Swal.close();
		activeNote.url = fileUrl;
		dispatch(startSaveNote(activeNote));
	};
};

export const startDelete = (id) => {
	return async (dispatch, getState) => {
		const uid = getState().auth.uid;

		await db.doc(`${uid}/journal/notes/${id}`).delete();

		dispatch(deleNote(id));
		dispatch(startLoadingEntries(uid));
	};
};

//accciones sincronas
export const activeNote = (id, note) => {
	return {
		type: types.notesActive,
		payload: {
			id,
			...note,
		},
	};
};
export const setNotes = (notes) => {
	return {
		type: types.notesLoad,
		payload: notes,
	};
};

export const refreshNote = (id, note) => {
	return {
		type: types.notesUpdated,
		payload: {
			id,
			note: {
				id,
				...note,
			},
		},
	};
};

export const addNote = (id, note) => {
	return {
		type: types.notesAddNew,
		payload: {
			id,
			...note,
		},
	};
};

export const setEntry = (entradas) => {
	return {
		type: types.notesEntries,
		payload: entradas,
	};
};

export const deleNote = (id) => {
	return {
		type: types.notesDelete,
		payload: id,
	};
};

export const noteLogout = () => {
	return {
		type: types.notesLogoutCleaning,
	};
};
