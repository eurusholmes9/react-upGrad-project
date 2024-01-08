import { useState } from 'react';
import apiClient from '../adapters/apiClient';

export const usePostOrder = () => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const postOrder = async (order) => {
		try {
			setLoading(true);
			const response = await apiClient.post('/api/orders', order);
			const data = await response.data;
			setLoading(false);
			return data;
		} catch (error) {
			setError(error);
			setLoading(false);
		}
	};

	return { postOrder, loading, error };
};
