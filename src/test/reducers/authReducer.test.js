import { authReducer } from './../../reducers/authReducer';
import { types } from './../../types/types';

describe('Pruebas en el Authreducer', () => {
	const loginUser = {
		uid: 'lkdneksadsgsd',
		displayName: 'Juan',
	};

	test('debe retornar el usuario', () => {
		const dispatch = {
			type: types.login,
			payload: loginUser,
		};

		const usuario = authReducer({}, dispatch);

		expect(usuario).toStrictEqual({
			uid: loginUser.uid,
			name: loginUser.displayName,
			logout: false,
		});
	});

	test('debe retornar el usuario', () => {
		const dispatch = {
			type: types.logout,
		};

		const usuario = authReducer({}, dispatch);

		expect(usuario).toEqual({
			logout: true,
		});
	});

	test('default state', () => {
		const dispatch = {
			type: types.logou12123t,
		};

		const usuario = authReducer({}, dispatch);

		expect(usuario).toEqual({});
	});
});
