import React, { useRef } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useParams } from 'react-router-dom';
import { useProduct } from '../../hooks/useProducts';
import { useOrderDispatch } from '../../contexts/order';
import { useNavigate } from 'react-router-dom';
import { createOrderRequest } from '../../contexts/order';
import { useAuthState } from '../../contexts/auth/context';
export default function ProductDetailsPage() {
	const { productId } = useParams();
	const { userId } = useAuthState();
	const { product, loading, error } = useProduct(productId);
	const navigate = useNavigate();
	const dispatch = useOrderDispatch();
	const quantityRef = useRef();

	if (loading) return <div>Loading...</div>;

	if (error) return <div>Something went wrong: {error.message}</div>;

	const handleOrderItem = () => {
		createOrderRequest(dispatch, {
			product: product.id,
			quantity: Number(quantityRef.current.value),
			userw: userId,
		});
		navigate('/order');
	};

	return (
		<Box
			sx={{
				flexGrow: 1,
				height: '100vh',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
			}}>
			<Grid
				container
				spacing={4}
				marginX={'auto'}
				marginY={0}
				sx={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
				}}>
				<Grid item xs={4}>
					<img src={product.imageUrl} alt='product' />
				</Grid>
				<Grid item xs={8}>
					<Box>
						<Box display={'flex'} gap={2} flexDirection={'column'}>
							<Typography
								variant='h4'
								component='div'
								display={'flex'}
								alignItems={'center'}>
								{product.name}
								<Box
									sx={{
										backgroundColor: '#3f51b5',
										width: 'fit-content',
										borderRadius: 40,
										marginLeft: 2,
										paddingX: 2,
										paddingY: 1,
									}}
									display={'inline-block'}
									textAlign={'center'}>
									<Typography
										variant='body1'
										component='div'
										sx={{
											color: 'white',
											whiteSpace: 'nowrap',
										}}>
										Available Quantity: {product.availableItems}
									</Typography>
								</Box>
							</Typography>
							<Typography variant='h6' component='div'>
								Category: <b>{product.category}</b>
							</Typography>
							<Typography variant='body1' component='div'>
								{product.description}
							</Typography>
							<Typography variant='h4' component='div' color={'red'}>
								₹{product.price}
							</Typography>
						</Box>
						<Box marginTop={4}>
							<TextField
								id='outlined-basic'
								label='Enter Quantity'
								variant='outlined'
								required
								inputRef={quantityRef}
								type='number'
							/>
						</Box>
						<Button
							sx={{ marginTop: 2, backgroundColor: '#3f51b5' }}
							variant='contained'
							onClick={handleOrderItem}>
							Place Order
						</Button>
					</Box>
				</Grid>
			</Grid>
		</Box>
	);
}
