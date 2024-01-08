import React, { useRef } from 'react';

import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useProductCategories } from '../../hooks/useProducts';
import { usePostProduct } from '../../hooks/useProducts';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const AddProductForm = () => {
	const [category, setCategory] = React.useState('');
	const { categories } = useProductCategories();
	const { postProduct } = usePostProduct();
	const nameRef = useRef();
	const categoryRef = useRef();
	const manufacturerRef = useRef();
	const availableItemsRef = useRef();
	const priceRef = useRef();
	const imageUrlRef = useRef();
	const productDescriptionRef = useRef();
	const navigate = useNavigate();

	const handleChange = (event) => {
		setCategory(event.target.value);
	};

	const handleSubmit = async () => {
		const product = {
			name: nameRef.current.value,
			category: categoryRef.current.value,
			manufacturer: manufacturerRef.current.value,
			availableItems: availableItemsRef.current.value,
			price: priceRef.current.value,
			imageUrl: imageUrlRef.current.value,
			description: productDescriptionRef.current.value,
		};

		const response = await postProduct(product);

		console.log(response);
		if (response) {
			toast.success(`Product ${product.name} created successfully`);
			//reset form
			nameRef.current.value = '';
			categoryRef.current.value = '';
			manufacturerRef.current.value = '';
			availableItemsRef.current.value = '';
			priceRef.current.value = '';
			imageUrlRef.current.value = '';
			productDescriptionRef.current.value = '';

			navigate('/');
		}
	};

	return (
		<Box
			justifyContent={'center'}
			display={'flex'}
			alignItems={'center'}
			height={'100vh'}>
			<FormControl
				sx={{ width: '50%', maxWidth: '768px' }}
				noValidate
				autoComplete='off'>
				<Box
					display={'flex'}
					alignItems={'center'}
					flexDirection={'column'}
					gap={2}
					marginBottom={4}>
					<Typography variant={'h4'}>Add Product</Typography>
				</Box>
				<Box display={'flex'} flexDirection={'column'} gap={1}>
					<TextField
						inputRef={nameRef}
						id='name'
						label='Name'
						variant='outlined'
						required
					/>
					<FormControl variant='outlined' required>
						<InputLabel id='category-label'>Category</InputLabel>
						<Select
							inputRef={categoryRef}
							labelId='category-label'
							id='category'
							value={category}
							onChange={handleChange}
							label='Category'>
							{categories.map((category) => (
								<MenuItem key={category} value={category}>
									{category}
								</MenuItem>
							))}
						</Select>
					</FormControl>
					<TextField
						inputRef={manufacturerRef}
						id='manufacturer'
						label='Manufacturuer'
						variant='outlined'
						required
					/>
					<TextField
						inputRef={availableItemsRef}
						id='available-items'
						label='Available Items'
						variant='outlined'
						type='number'
						required
					/>
					<TextField
						inputRef={priceRef}
						id='price'
						label='Price'
						variant='outlined'
						type='number'
						required
					/>
					<TextField
						inputRef={imageUrlRef}
						id='image-url'
						label='Image URL'
						variant='outlined'
					/>
					<TextField
						inputRef={productDescriptionRef}
						id='product-description'
						label='Product Description'
						variant='outlined'
						multiline
					/>
					<Box marginTop={2} display={'flex'} flexDirection={'column'} gap={2}>
						<Button
							variant='contained'
							sx={{ backgroundColor: '#3f51b5' }}
							onClick={handleSubmit}>
							Save Product
						</Button>
					</Box>
				</Box>
			</FormControl>
		</Box>
	);
};

export default AddProductForm;
