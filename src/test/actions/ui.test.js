import { setError, removeError } from './../../actions/ui';
import { types } from './../../types/types';

describe('Pruebas en actions UI', () => {
	test('Todas las acciones deben funcionar', () => {
		const action = setError('El error se ha creado');

		expect(action).toEqual({
			type: types.uiSetError,
			payload: 'El error se ha creado',
		});

		const RemoveErrorAction = removeError();

		expect(RemoveErrorAction).toEqual({
			type: types.uiRemoveError,
		});
	});
});
