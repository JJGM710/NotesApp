import { types } from './../types/types';
/*
    {
        note:[]
        active: null o {
            id: 'alkmaklasmsakd',
            title : "",
            body: '',
            imageUrl: '',
            date: 124332
        }
    }
*/

const initialState = {
	notes: [],
	active: null,
};

export const notesReducer = (state = initialState, action) => {
	switch (action.type) {
		case types.notesActive:
			return {
				...state,
				active: {
					//regreso el estado anterior para que cuando se haga el save
					//evitar que el form save traiga un estado anterior
					// entonces quito esas propiedades del formSate y
					// manejo el estado nuevo traido directamente del active
					...state.active,
					...action.payload,
				},
			};

		case types.notesLoad:
			return {
				...state,
				notes: [...action.payload],
			};

		case types.notesUpdated:
			return {
				...state,
				notes: state.notes.map((note) =>
					note.id === action.payload.id ? action.payload.note : note
				),
			};
		case types.notesAddNew:
			return {
				...state,
				notes: [action.payload, ...state.notes],
			};

		case types.notesEntries:
			return {
				...state,
				config: action.payload,
			};

		case types.notesDelete:
			return {
				...state,
				active: null,
				notes: state.notes.filter((note) => note.id !== action.payload),
			};

		case types.notesLogoutCleaning:
			return {
				notes: [],
				active: null,
			};

		default:
			return state;
	}
};
