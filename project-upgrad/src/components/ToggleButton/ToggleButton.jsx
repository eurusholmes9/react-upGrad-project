import React, { useState } from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { useProductCategories } from '../../hooks/useProducts';
import { useFilterState } from '../../contexts/filter';
import { useFilterDispatch } from '../../contexts/filter';

export default function ColorToggleButton() {
	const [alignment, setAlignment] = useState('all');

	const { category } = useFilterState();
	const dispatch = useFilterDispatch();

	const { categories, loading, error } = useProductCategories();

	if (loading) return <div>Loading...</div>;

	if (error) return <div>Something went wrong: {error.message}</div>;

	const handleChange = (event, newAlignment) => {
		if (category === event.target.value) {
			dispatch({ type: 'CLEAR_FILTER_CATEGORY' });
			setAlignment('all');
		} else {
			dispatch({ type: 'SET_FILTER_CATEGORY', payload: event.target.value });
		}

		setAlignment(newAlignment);
	};

	return (
		<ToggleButtonGroup
			color='primary'
			value={alignment}
			exclusive
			onChange={handleChange}
			aria-label='Platform'
			sx={{ marginTop: 4 }}>
			<ToggleButton value='all' aria-label='all'>
				All
			</ToggleButton>
			{categories.map((category) => (
				<ToggleButton value={category} aria-label={category}>
					{category}
				</ToggleButton>
			))}
		</ToggleButtonGroup>
	);
}
