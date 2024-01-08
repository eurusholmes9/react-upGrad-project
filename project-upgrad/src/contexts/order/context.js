import React, { createContext, useContext, useReducer } from 'react';
import { OrderReducer, initialState } from './reducer';

const OrderStateContext = createContext();
const OrderDispatchContext = createContext();

export function useOrderState() {
	const context = useContext(OrderStateContext);
	if (context === undefined) {
		throw new Error('useOrderState must be used within a OrderProvider');
	}

	return context;
}

export function useOrderDispatch() {
	const context = useContext(OrderDispatchContext);
	if (context === undefined) {
		throw new Error('useOrderDispatch must be used within a OrderProvider');
	}

	return context;
}

export const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
	const [order, dispatch] = useReducer(OrderReducer, initialState);

	return (
		<OrderStateContext.Provider value={order}>
			<OrderDispatchContext.Provider value={dispatch}>
				{children}
			</OrderDispatchContext.Provider>
		</OrderStateContext.Provider>
	);
};
