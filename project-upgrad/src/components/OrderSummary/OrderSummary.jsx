import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useOrderState } from '../../contexts/order';
import { useProduct } from '../../hooks/useProducts';
import { useAddress } from '../../hooks/useAddresses';

export default function OrderSummary() {
	const orderState = useOrderState();

	const { product } = useProduct(orderState.order.product);
	const { address } = useAddress(orderState.order.address);

	return (
		<Card
			sx={{
				display: 'flex',
				width: 'auto',
				marginX: 'auto',
				marginY: 0,
			}}>
			<CardContent sx={{ flexGrow: 2, padding: 4 }}>
				<Box display={'flex'} gap={2} flexDirection={'column'}>
					<Typography
						variant='h4'
						component='div'
						display={'flex'}
						alignItems={'center'}>
						{product.name}
					</Typography>
					<Typography variant='body1' component='div'>
						Quantity: {orderState.order.quantity}
					</Typography>
					<Typography variant='h6' component='div'>
						Category: <b>{product.category}</b>
					</Typography>
					<Typography variant='body1' component='div'>
						{product.description}
					</Typography>
					<Typography variant='h6' component='div'>
						Price: <b>₹ {product.price * orderState.order.quantity}</b>
					</Typography>
				</Box>
			</CardContent>
			<span
				style={{
					width: '1px',
					height: '100%',
					backgroundColor: '#e6e6e6',
				}}></span>

			<CardContent sx={{ flexGrow: 1, padding: 4 }}>
				<Typography variant='h4' component='div' mb={2}>
					Address Details:
				</Typography>

				<Typography variant='body1' component='div'>
					{address.name}
				</Typography>
				<Typography variant='body1' component='div'>
					{address.contactNumber}
				</Typography>

				<Typography variant='body1' component='div'>
					{address.street + ', ' + address.landmark + ', ' + address.city}
				</Typography>
				<Typography variant='body1' component='div'>
					{address.state}
				</Typography>
				<Typography variant='body1' component='div'>
					{address.zipcode}
				</Typography>
			</CardContent>
		</Card>
	);
}
