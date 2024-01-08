import {
	CREATE_ORDER_REQUEST,
	CREATE_ORDER_SUCCESS,
	CREATE_ORDER_FAILURE,
} from './actions';

export const initialState = {
	loading: false,
	order: null,
	error: null,
};

export const OrderReducer = (initialState, action) => {
	switch (action.type) {
		case CREATE_ORDER_REQUEST:
			return {
				...initialState,
				loading: true,
				order: action.payload,
			};
		case CREATE_ORDER_SUCCESS:
			return {
				...initialState,
				loading: false,
				order: action.payload,
			};
		case CREATE_ORDER_FAILURE:
			return {
				...initialState,
				loading: false,
				error: action.payload,
			};

		default:
			throw new Error(`Unhandled action type: ${action.type}`);
	}
};
