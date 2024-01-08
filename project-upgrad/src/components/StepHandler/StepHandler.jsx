import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

const StepHandler = ({ handleBack, handleNext, activeStep }) => {
	return (
		<Box
			sx={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				gap: 2,
			}}>
			<Button onClick={handleBack} variant='text' sx={{ color: '#3f51b5' }}>
				Back
			</Button>
			<Button
				onClick={handleNext}
				variant='contained'
				sx={{ backgroundColor: '#3f51b5' }}>
				{activeStep !== 2 ? 'Next' : 'Place Order'}
			</Button>
		</Box>
	);
};

export default StepHandler;
