let token = localStorage.getItem('token');

export const initialState = {
	token: '' || token,
	userId: '',
	loading: false,
	roles: [],
	errorMessage: null,
};

export const AuthReducer = (initialState, action) => {
	switch (action.type) {
		case 'REQUEST_LOGIN':
			return {
				...initialState,
				loading: true,
			};
		case 'LOGIN_SUCCESS':
			return {
				...initialState,
				token: action.payload.token,
				userId: action.payload.id,
				roles: action.payload.roles,
				loading: false,
			};
		case 'LOGOUT':
			return {
				...initialState,
				userId: '',
				token: '',
				roles: [],
			};

		case 'LOGIN_ERROR':
			return {
				...initialState,
				loading: false,
				errorMessage: action.error,
			};

		case 'REQUEST_REGISTER':
			return {
				...initialState,
				loading: true,
			};

		case 'REGISTER_SUCCESS':
			return {
				...initialState,
				loading: false,
			};

		case 'REGISTER_ERROR':
			return {
				...initialState,
				loading: false,
				errorMessage: action.error,
			};
		case 'SET_USER':
			return {
				...initialState,
				userId: action.payload.id,
				roles: action.payload.roles,
			};
		case 'SET_TOKEN':
			return {
				...initialState,
				token: action.payload,
			};

		default:
			throw new Error(`Unhandled action type: ${action.type}`);
	}
};
