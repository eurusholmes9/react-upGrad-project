import React, { createContext, useContext, useReducer } from 'react';
import { FilterReducer, initialState } from './reducer';

const FilterStateContext = createContext();
const FilterDispatchContext = createContext();

export function useFilterState() {
	const context = useContext(FilterStateContext);
	if (context === undefined) {
		throw new Error('useFilterState must be used within a FilterProvider');
	}

	return context;
}

export function useFilterDispatch() {
	const context = useContext(FilterDispatchContext);
	if (context === undefined) {
		throw new Error('useFilterDispatch must be used within a FilterProvider');
	}

	return context;
}

export const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
	const [filter, dispatch] = useReducer(FilterReducer, initialState);

	return (
		<FilterStateContext.Provider value={filter}>
			<FilterDispatchContext.Provider value={dispatch}>
				{children}
			</FilterDispatchContext.Provider>
		</FilterStateContext.Provider>
	);
};
