import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDeleteProduct } from '../../hooks/useProducts';
import { toast } from 'react-toastify';
export default function AlertDialog({ product }) {
	const [open, setOpen] = React.useState(false);

	const { deleteProduct } = useDeleteProduct(product.id);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleDeleteProduct = async () => {
		deleteProduct()
			.then(() => {
				toast.success(`Product ${product.name} deleted successfully!`);
				setOpen(false);
			})
			.catch((error) => {
				toast.error(`Error deleting product ${product.name}!`);
				setOpen(false);
			});
	};

	return (
		<React.Fragment>
			<Button onClick={handleClickOpen}>
				<DeleteIcon sx={{ color: 'gray' }} />
			</Button>
			<Dialog
				open={open}
				onClose={handleClose}
				aria-labelledby='alert-dialog-title'
				aria-describedby='alert-dialog-description'>
				<DialogTitle id='alert-dialog-title'>
					{'Confirm deletion of product!'}
				</DialogTitle>
				<DialogContent>
					<DialogContentText id='alert-dialog-description'>
						Are you sure you want to delete this product?
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button
						onClick={handleDeleteProduct}
						autoFocus
						variant='contained'
						sx={{ backgroundColor: '#3f51b5' }}>
						Ok
					</Button>
					<Button
						onClick={handleClose}
						variant='outlined'
						sx={{ color: '#3f51b5' }}>
						Cancel
					</Button>
				</DialogActions>
			</Dialog>
		</React.Fragment>
	);
}
