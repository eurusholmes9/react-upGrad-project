import {
	SET_FILTER_CATEGORY,
	CLEAR_FILTER_CATEGORY,
	SET_FILTER_SORT_BY,
	CLEAR_FILTER_SORT_BY,
	SET_FILTER_SEARCH,
	CLEAR_FILTER_SEARCH,
} from './actions';

export const initialState = {
	category: 'all',
	sortBy: 'default',
	search: '',
};

export const FilterReducer = (initialState, action) => {
	switch (action.type) {
		case SET_FILTER_CATEGORY:
			return {
				...initialState,
				category: action.payload,
			};
		case CLEAR_FILTER_CATEGORY:
			return {
				...initialState,
				category: 'all',
			};
		case SET_FILTER_SORT_BY:
			return {
				...initialState,
				sortBy: action.payload,
			};
		case CLEAR_FILTER_SORT_BY:
			return {
				...initialState,
				sortBy: 'default',
			};

		case SET_FILTER_SEARCH:
			return {
				...initialState,
				search: action.payload,
			};
		case CLEAR_FILTER_SEARCH:
			return {
				...initialState,
				search: '',
			};
		default:
			throw new Error(`Unhandled action type: ${action.type}`);
	}
};
