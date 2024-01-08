import { useState, useEffect } from 'react';
import apiClient from '../adapters/apiClient';

export const useAddresses = () => {
	const [addresses, setAddresses] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchAddresses = async () => {
			try {
				const response = await apiClient.get('/api/addresses');
				const data = await response.data;
				setAddresses(data);
				setLoading(false);
			} catch (error) {
				setError(error);
				setLoading(false);
			}
		};

		fetchAddresses();
	}, []);

	return { addresses, loading, error };
};

export const useAddress = (addressId) => {
	const [address, setAddress] = useState({});
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchAddress = async () => {
			try {
				const response = await apiClient.get(`/api/addresses/${addressId}`);
				const data = await response.data;
				setAddress(data);
				setLoading(false);
			} catch (error) {
				setError(error);
				setLoading(false);
			}
		};

		fetchAddress();
	}, [addressId]);

	return { address, loading, error };
};

export const usePostAddress = () => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const postAddress = async (address) => {
		try {
			setLoading(true);
			const response = await apiClient.post('/api/addresses', address);
			const data = await response.data;
			setLoading(false);
			return data;
		} catch (error) {
			setError(error);
			setLoading(false);
		}
	};

	return { postAddress, loading, error };
};
