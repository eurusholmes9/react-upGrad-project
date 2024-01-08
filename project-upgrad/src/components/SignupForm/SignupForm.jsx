import React, { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { signupUser } from '../../contexts/auth/actions';
import { useAuthDispatch } from '../../contexts/auth/context';

const SignupForm = () => {
	const firstNameRef = useRef('');
	const lastNameRef = useRef('');
	const emailRef = useRef('');
	const passwordRef = useRef('');
	const confirmPasswordRef = useRef('');
	const contactNumberRef = useRef('');

	const dispatch = useAuthDispatch();

	const navigate = useNavigate();

	const handleSubmit = async (event) => {
		event.preventDefault();

		const user = {
			firstName: firstNameRef.current.value,
			lastName: lastNameRef.current.value,
			email: emailRef.current.value,
			password: passwordRef.current.value,
			contactNumber: contactNumberRef.current.value,
			roles: ['user'],
		};

		// Make a POST request to /users endpoint
		signupUser(dispatch, user)
			.then((response) => {
				navigate('/login');
			})
			.catch((error) => {
				console.log(error);
			});
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
					<Typography variant={'h4'}>Sign Up</Typography>
				</Box>

				<Box display={'flex'} flexDirection={'column'} gap={1}>
					<TextField
						id='outlined-basic'
						label='First Name'
						variant='outlined'
						margin='dense'
						required
						inputRef={firstNameRef}
						value={firstNameRef.current.value}
					/>
					<TextField
						label='Last Name'
						variant='outlined'
						margin='dense'
						required
						inputRef={lastNameRef}
						value={lastNameRef.current.value}
					/>
					<TextField
						id='outlined-basic'
						label='Email Address'
						variant='outlined'
						margin='dense'
						type='email'
						required
						inputRef={emailRef}
						value={emailRef.current.value}
					/>
					<TextField
						id='outlined-basic'
						label='Password'
						type='password'
						variant='outlined'
						margin='dense'
						required
						inputRef={passwordRef}
						value={passwordRef.current.value}
					/>
					<TextField
						id='outlined-basic'
						label='Confirm Password'
						type='password'
						variant='outlined'
						margin='dense'
						required
						inputRef={confirmPasswordRef}
						value={confirmPasswordRef.current.value}
					/>
					<TextField
						id='outlined-basic'
						label='Contact Number'
						variant='outlined'
						margin='dense'
						required
						inputRef={contactNumberRef}
						value={contactNumberRef.current.value}
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
							Sign Up
						</Button>
						<Link to='/login'>Already have an account? Login</Link>
					</Box>
				</Box>
			</FormControl>
		</Box>
	);
};

export default SignupForm;
