import React, { useEffect, useState } from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import ShoppingCart from '@mui/icons-material/ShoppingCart';
import { Link } from 'react-router-dom';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import Box from '@mui/material/Box';
import './NavigationBar.css';
import { useAuthDispatch, useAuthState } from '../../contexts/auth/context';
import { logout } from '../../contexts/auth/actions';
import { useNavigate } from 'react-router-dom';
import { getValue } from '../../common/utils/local-storage';
import { useFilterDispatch } from '../../contexts/filter';
import useDebounceValue from '../../common/hooks/useDebounceValue';

const Search = styled('div')(({ theme }) => ({
	position: 'relative',
	borderRadius: theme.shape.borderRadius,
	backgroundColor: alpha(theme.palette.common.white, 0.15),
	'&:hover': {
		backgroundColor: alpha(theme.palette.common.white, 0.25),
	},
	marginLeft: 0,
	width: '100%',
	[theme.breakpoints.up('sm')]: {
		marginLeft: theme.spacing(1),
		width: 'auto',
	},
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
	padding: theme.spacing(0, 2),
	height: '100%',
	position: 'absolute',
	pointerEvents: 'none',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
	color: 'inherit',
	'& .MuiInputBase-input': {
		padding: theme.spacing(1, 1, 1, 0),
		// vertical padding + font size from searchIcon
		paddingLeft: `calc(1em + ${theme.spacing(4)})`,
		transition: theme.transitions.create('width'),
		width: '100%',
		[theme.breakpoints.up('md')]: {
			width: '20ch',
		},
	},
}));

const NavigationBar = () => {
	const authDispatch = useAuthDispatch();
	const filterDispatch = useFilterDispatch();
	const { token, roles } = useAuthState();
	const navigate = useNavigate();

	const [searchTerm, setSearchTerm] = useState('');
	const debouncedSearchTerm = useDebounceValue(searchTerm, 500);

	useEffect(() => {
		if (debouncedSearchTerm) {
			filterDispatch({
				type: 'SET_FILTER_SEARCH',
				payload: debouncedSearchTerm,
			});
		}

		return () => {
			filterDispatch({ type: 'CLEAR_FILTER_SEARCH' });
		};
	}, [debouncedSearchTerm, filterDispatch]);

	const handleSearchChange = (event) => {
		setSearchTerm(event.target.value);
	};

	useEffect(() => {
		if (!token || !roles.length) {
			const token = getValue('token');
			const user = getValue('user');

			if (!token || !user) {
				return;
			}

			authDispatch({ type: 'SET_TOKEN', payload: token });
			authDispatch({ type: 'SET_USER', payload: user });
		}
	}, [token, roles, authDispatch]);

	const handleLogout = async () => {
		const response = await logout(authDispatch);
		if (!response) return;

		navigate('/login');
	};

	return token ? (
		<AppBar position='static' sx={{ backgroundColor: '#3f51b5' }}>
			<Toolbar className='navbar-container'>
				<Box display={'flex'}>
					<ShoppingCart
						size='large'
						edge='start'
						color='inherit'
						aria-label='logo'
						sx={{ mr: 2 }}
					/>
					<Typography variant='h6' component='div'>
						upGrad E-Shop
					</Typography>
				</Box>
				<Search>
					<SearchIconWrapper>
						<SearchIcon />
					</SearchIconWrapper>
					<StyledInputBase
						placeholder='Search…'
						inputProps={{ 'aria-label': 'search' }}
						onChange={handleSearchChange}
					/>
				</Search>
				<Box display={'flex'} gap={4} alignItems={'center'}>
					<Link to='/'>Home</Link>
					{roles.includes('ADMIN') && (
						<Link to='/add-product'> Add Product</Link>
					)}
					<Button variant='contained' color='error' onClick={handleLogout}>
						LOGOUT
					</Button>
				</Box>
			</Toolbar>
		</AppBar>
	) : (
		<AppBar position='static' sx={{ backgroundColor: '#3f51b5' }}>
			<Toolbar className='navbar-container'>
				<Box display={'flex'}>
					<ShoppingCart
						size='large'
						edge='start'
						color='inherit'
						aria-label='logo'
						sx={{ mr: 2 }}
					/>
					<Typography variant='h6' component='div'>
						upGrad E-Shop
					</Typography>
				</Box>

				<Box display={'flex'} gap={4} alignItems={'center'}>
					<Link to='/login'>Login</Link>
					<Link to='/signup'>Sign Up</Link>
				</Box>
			</Toolbar>
		</AppBar>
	);
};

export default NavigationBar;
