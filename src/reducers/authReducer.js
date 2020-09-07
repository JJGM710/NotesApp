import { types } from '../types/types';
/*
    {
        uid:lkdneksd,
        name: Fernando
    }

*/
export const authReducer = (state = {}, action) => {
	switch (action.type) {
		case types.login:
			return {
				uid: action.payload.uid,
				name: action.payload.displayName,
				logout: false,
			};

		case types.logout:
			return { logout: true };

		default:
			return state;
	}
};
