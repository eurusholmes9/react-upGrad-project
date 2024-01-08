import React, { useState } from 'react';
import Box from '@mui/material/Box';
import AddressForm from '../../components/AddressForm/AddressForm';
import HorizontalLinearStepper from '../../components/Stepper/Stepper';
import OrderSummary from '../../components/OrderSummary/OrderSummary';
import StepHandler from '../../components/StepHandler/StepHandler';
import { toast } from 'react-toastify';
import { useOrderState } from '../../contexts/order';
import { usePostOrder } from '../../hooks/useOrders';
import { useNavigate } from 'react-router-dom';

const CreateOrderPage = () => {
	const steps = ['Items', 'Select Address', 'Confirm Order'];
	const orderState = useOrderState();
	const { postOrder } = usePostOrder();
	const [activeStep, setActiveStep] = useState(1);
	const navigate = useNavigate();

	const handleNext = async () => {
		let newActiveStep;
		if (activeStep === steps.length - 1) {
			const response = await postOrder(orderState.order);
			console.log(response);
			if (response) {
				toast.success('Order Placed Successfully');
				navigate('/');
			}
		} else {
			if (activeStep === 1) {
				if (orderState.order.address === '') {
					toast.error('Please Select an Address');
					return;
				}
			}
			newActiveStep = activeStep + 1;
		}
		setActiveStep(newActiveStep);
	};

	const handleBack = () => {
		let newActiveStep;
		if (activeStep === 0) {
			newActiveStep = steps.length - 1;
		} else {
			newActiveStep = activeStep - 1;
		}
		setActiveStep(newActiveStep);
	};

	return (
		<Box
			display={'flex'}
			alignItems={'stretch'}
			justifyContent={'center'}
			flexDirection={'column'}
			width={'80%'}
			height={'100%'}
			maxWidth={'1024px'}
			marginX={'auto'}
			marginY={0}
			gap={8}>
			<HorizontalLinearStepper activeStep={activeStep} />
			{activeStep === 1 && <AddressForm />} {/* second step after checkout */}
			{activeStep === 2 && <OrderSummary />} {/* final summary */}
			<StepHandler
				handleNext={handleNext}
				handleBack={handleBack}
				activeStep={activeStep}
			/>
		</Box>
	);
};

export default CreateOrderPage;
