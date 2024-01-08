import React, { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useAuthDispatch } from '../../contexts/auth/context';
import { loginUser } from '../../contexts/auth/actions';

const LoginForm = () => {
	const navigate = useNavigate();
	const dispatch = useAuthDispatch();

	const emailRef = useRef('');
	const passwordRef = useRef('');

	const handleSubmit = async (event) => {
		event.preventDefault();

		const user = {
			username: emailRef.current.value,
			password: passwordRef.current.value,
		};

		const response = await loginUser(dispatch, user);

		if (!response) return;

		navigate('/');
	};

	return (
		<Box
			justifyContent={'center'}
			display={'flex'}
			alignItems={'center'}
			height={'100vh'}>
			<FormControl sx={{ width: '50%', maxWidth: '768px' }}>
				<Box
					display={'flex'}
					alignItems={'center'}
					flexDirection={'column'}
					gap={2}
					marginBottom={4}>
					<Box
						display={'flex'}
						borderRadius={'100%'}
						backgroundColor={'#f50057'}
						width={50}
						height={50}
						justifyContent={'center'}
						alignItems={'center'}>
						<LockOutlinedIcon fontSize={'medium'} sx={{ color: '#fff' }} />
					</Box>
					<Typography variant={'h4'}>Sign in</Typography>
				</Box>

				<Box display={'flex'} flexDirection={'column'} gap={1}>
					<TextField
						id='outlined-basic'
						label='Email Address'
						variant='outlined'
						margin='dense'
						inputRef={emailRef}
						required
						type='email'
					/>
					<TextField
						id='outlined-basic'
						label='Password'
						variant='outlined'
						margin='dense'
						inputRef={passwordRef}
						required
						type='password'
					/>
					<Box marginTop={2} display={'flex'} flexDirection={'column'} gap={2}>
						<Button
							variant='contained'
							sx={{ backgroundColor: '#3f51b5' }}
							onClick={handleSubmit}>
							Sign In
						</Button>
						<Link to='/signup'>Don't have an account? Sign up</Link>
					</Box>
				</Box>
			</FormControl>
		</Box>
	);
};

export default LoginForm;
