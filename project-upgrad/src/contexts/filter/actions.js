// Define action types
export const SET_FILTER_CATEGORY = 'SET_FILTER_CATEGORY';
export const CLEAR_FILTER_CATEGORY = 'CLEAR_FILTER_CATEGORY';
export const SET_FILTER_SORT_BY = 'SET_FILTER_SORT_BY';
export const CLEAR_FILTER_SORT_BY = 'CLEAR_FILTER_SORT_BY';
export const SET_FILTER_SEARCH = 'SET_FILTER_SEARCH';
export const CLEAR_FILTER_SEARCH = 'CLEAR_FILTER_SEARCH';

// Action creators
export const setFilterCategory = (dispatch, category) =>
	dispatch({
		type: SET_FILTER_CATEGORY,
		payload: category,
	});

export const clearFilterCategory = (dispatch) =>
	dispatch({
		type: CLEAR_FILTER_CATEGORY,
	});

export const setFilterSortBy = (dispatch, sortBy) =>
	dispatch({
		type: SET_FILTER_SORT_BY,
		payload: sortBy,
	});

export const clearFilterSortBy = (dispatch) =>
	dispatch({
		type: CLEAR_FILTER_SORT_BY,
	});

export const setFilterSearch = (dispatch, search) =>
	dispatch({
		type: SET_FILTER_SEARCH,
		payload: search,
	});

export const clearFilterSearch = (dispatch) =>
	dispatch({
		type: CLEAR_FILTER_SEARCH,
	});
