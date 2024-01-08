import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import { useFilterState } from '../../contexts/filter';
import { useFilterDispatch } from '../../contexts/filter';

export default function SelectLabels() {
	const [filter, setFilter] = React.useState('');

	const { sortBy } = useFilterState();
	const dispatch = useFilterDispatch();

	const handleChange = (event) => {
		if (sortBy === event.target.value) {
			dispatch({ type: 'CLEAR_FILTER_SORT_BY' });
			setFilter('');
		} else {
			dispatch({ type: 'SET_FILTER_SORT_BY', payload: event.target.value });
		}
		setFilter(event.target.value);
	};

	return (
		<FormControl
			sx={{ m: 1, minWidth: 120, alignSelf: 'start', marginLeft: 4 }}>
			<Typography variant={'p'}>Sort By:</Typography>
			<Select
				value={filter}
				onChange={handleChange}
				placeholder='Select..'
				displayEmpty
				inputProps={{ 'aria-label': 'Without label' }}>
				<MenuItem value=''>
					<em>None</em>
				</MenuItem>
				<MenuItem value={'default'}>Default</MenuItem>
				<MenuItem value={'desc'}>Price: High to Low</MenuItem>
				<MenuItem value={'asc'}>Price: Low to High</MenuItem>
				<MenuItem value={'newest'}>Newest</MenuItem>
			</Select>
		</FormControl>
	);
}
