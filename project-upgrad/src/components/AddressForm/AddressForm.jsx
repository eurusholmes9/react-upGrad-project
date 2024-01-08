import React, { useState, useRef } from 'react';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useAddresses, usePostAddress } from '../../hooks/useAddresses';
import { toast } from 'react-toastify';
import { useOrderDispatch, useOrderState } from '../../contexts/order';

const AddressForm = () => {
	const orderState = useOrderState();
	const dispatch = useOrderDispatch();
	const { addresses, loading, error } = useAddresses();
	const { postAddress } = usePostAddress();
	const [address, setAddress] = useState('');
	const nameRef = useRef();
	const contactNumberRef = useRef();
	const streetRef = useRef();
	const cityRef = useRef();
	const stateRef = useRef();
	const landmarkRef = useRef();
	const zipCodeRef = useRef();

	if (loading) return <div>Loading...</div>;

	if (error) return <div>Something went wrong: {error.message}</div>;

	const handleChange = (event) => {
		setAddress(event.target.value);
		const payload = {
			...orderState.order,
			address: event.target.value,
		};

		dispatch({
			type: 'CREATE_ORDER_REQUEST',
			payload: payload,
		});
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		// Get the value of each input field using the ref
		const name = nameRef.current.value;
		const contactNumber = contactNumberRef.current.value;
		const street = streetRef.current.value;
		const city = cityRef.current.value;
		const state = stateRef.current.value;
		const landmark = landmarkRef.current.value;
		const zipCode = zipCodeRef.current.value;

		// Create the address object
		const address = {
			name,
			contactNumber,
			street,
			city,
			state,
			landmark,
			zipCode,
		};
		const response = await postAddress(address);

		// If successful, redirect to home page
		if (response) {
			toast.success('Address Added Successfully');
		} else if (response.status !== 200) {
			// If unsuccessful, show error message
			toast.error(response.data.message);
		}
	};

	return (
		<Box
			display={'flex'}
			flexDirection={'column'}
			alignItems={'center'}
			gap={4}>
			<Box sx={{ width: '50%', maxWidth: '768px' }}>
				<Typography variant='body1'>Select Address</Typography>
				<Select
					value={address}
					displayEmpty
					onChange={handleChange}
					sx={{ width: '100%' }}>
					<MenuItem value=''>
						<em>None</em>
					</MenuItem>
					{addresses.map((address) => (
						<MenuItem value={address.id}>{address.name}</MenuItem>
					))}
				</Select>
			</Box>
			<Typography variant='body1'>.OR.</Typography>
			<FormControl sx={{ width: '30%', maxWidth: '768px' }}>
				<Box
					display={'flex'}
					alignItems={'center'}
					flexDirection={'column'}
					gap={2}
					marginBottom={4}>
					<Typography variant={'h4'}>Add Adress</Typography>
				</Box>

				<Box display={'flex'} flexDirection={'column'} gap={1}>
					<TextField
						ref={nameRef}
						id='outlined-basic'
						label='Name'
						variant='outlined'
						margin='dense'
						required
					/>
					<TextField
						ref={contactNumberRef}
						id='outlined-basic'
						label='Contact Number'
						variant='outlined'
						margin='dense'
						required
					/>
					<TextField
						ref={streetRef}
						id='outlined-basic'
						label='Street'
						variant='outlined'
						margin='dense'
						required
					/>
					<TextField
						ref={cityRef}
						id='outlined-basic'
						label='City'
						variant='outlined'
						margin='dense'
						required
					/>
					<TextField
						ref={stateRef}
						id='outlined-basic'
						label='State'
						variant='outlined'
						margin='dense'
						required
					/>
					<TextField
						ref={landmarkRef}
						id='outlined-basic'
						label='Landmark'
						variant='outlined'
						margin='dense'
					/>
					<TextField
						ref={zipCodeRef}
						id='outlined-basic'
						label='Zip Code'
						variant='outlined'
						margin='dense'
					/>

					<Box
						marginTop={2}
						display={'flex'}
						flexDirection={'column'}
						gap={2}
						textAlign={'end'}>
						<Button
							variant='contained'
							sx={{ backgroundColor: '#3f51b5' }}
							onClick={handleSubmit}>
							Save Address
						</Button>
					</Box>
				</Box>
			</FormControl>
		</Box>
	);
};

export default AddressForm;
