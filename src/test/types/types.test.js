import '@testing-library/react';
import { types } from './../../types/types';

describe('Pruebas en type.js', () => {
	test('El objeto debe ser igual', () => {
		expect(types).toEqual({
			login: '[Auth] Login',
			logout: '[Auth] Logout',

			uiSetError: '[UI] Set error',
			uiRemoveError: '[UI] Remove error',
			uiRedirect: '[UI] Redirect error',
			uiRemoveRedirect: '[UI] Remove Redirect error',

			uiStartLoading: '[UI] Start Loading',
			uiFinishLoading: '[UI] Finish Loading',

			notesAddNew: '[Notes] New Note',
			notesActive: '[Notes] Set Active Note',
			notesLoad: '[Notes] Load Note',
			notesUpdated: '[Notes] Update note',
			notesFileUrl: '[Notes] Update image url',
			notesDelete: '[Notes] Delete note',
			notesLogoutCleaning: '[Notes] Logout Cleaning',
			notesEntries: '[Notes] Entries Add',
			notesLastUpdate: '[Notes] Note Last Update',
		});
	});
});
