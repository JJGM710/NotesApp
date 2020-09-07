import { types } from './../types/types';
export const setError = (err) => {
	return {
		type: types.uiSetError,
		payload: err,
	};
};

export const removeError = () => {
	return {
		type: types.uiRemoveError,
	};
};

export const redirectError = () => {
	return {
		type: types.uiRedirect,
	};
};

export const removeRedirectError = () => {
	return {
		type: types.uiRemoveRedirect,
	};
};

export const startLoading = () => {
	return {
		type: types.uiStartLoading,
	};
};

export const finishLoading = () => {
	return {
		type: types.uiFinishLoading,
	};
};
