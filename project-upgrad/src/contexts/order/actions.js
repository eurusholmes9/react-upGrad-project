// Define action types
export const CREATE_ORDER_REQUEST = 'CREATE_ORDER_REQUEST';
export const CREATE_ORDER_SUCCESS = 'CREATE_ORDER_SUCCESS';
export const CREATE_ORDER_FAILURE = 'CREATE_ORDER_FAILURE';

// Action creators
export const createOrderRequest = (dispatch, orderData) =>
	dispatch({
		type: CREATE_ORDER_REQUEST,
		payload: orderData,
	});

export const createOrderSuccess = (dispatch, order) =>
	dispatch({
		type: CREATE_ORDER_SUCCESS,
		payload: order,
	});

export const createOrderFailure = (dispatch, error) =>
	dispatch({
		type: CREATE_ORDER_FAILURE,
		payload: error,
	});
