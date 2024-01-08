import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import EditIcon from '@mui/icons-material/Edit';
import { useAuthState } from '../../contexts/auth';
import { useNavigate } from 'react-router-dom';
import AlertDialog from '../AlertDialog/AlertDialog';

export default function ProductCard({ product }) {
	const userDetails = useAuthState();
	const navigate = useNavigate();

	const navigateToDetailsPage = () => {
		navigate(`/products/${product.id}`);
	};

	const navigateToModifyPage = () => {
		navigate(`/products/${product.id}/modify`);
	};
	return (
		<Card
			sx={{
				width: 345,
				height: 345,
				display: 'flex',
				flexDirection: 'column',
			}}>
			<CardMedia
				sx={{ height: 140 }}
				image={
					product.imageUrl
						? product.imageUrl
						: 'https://mui.com/static/images/cards/contemplative-reptile.jpg'
				}
				title='green iguana'
			/>
			<CardContent sx={{ flexGrow: 1 }}>
				<Box display={'flex'} justifyContent={'space-between'}>
					<Typography gutterBottom variant='h5' component='div'>
						{product.name}
					</Typography>
					<Typography gutterBottom variant='h5' component='div'>
						₹{product.price}
					</Typography>
				</Box>
				<Typography variant='body2' color='text.secondary'>
					{product.description}
				</Typography>
			</CardContent>
			<CardActions
				sx={{
					justifyContent: 'space-between',
					alignItems: 'center',
					display: 'flex',
				}}>
				<Button
					variant='contained'
					size='small'
					onClick={navigateToDetailsPage}
					sx={{ backgroundColor: '#3f51b5' }}>
					Buy
				</Button>
				{userDetails.roles.includes('ADMIN') && (
					<Box display={'flex'}>
						<Button onClick={navigateToModifyPage}>
							<EditIcon sx={{ color: 'gray' }} />
						</Button>
						<AlertDialog product={product} />
					</Box>
				)}
			</CardActions>
		</Card>
	);
}
