import { useState, useEffect } from 'react';
import apiClient from '../adapters/apiClient';

export const useProducts = () => {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				const response = await apiClient.get('/api/products');
				const data = await response.data;
				setProducts(data);
				setLoading(false);
			} catch (error) {
				setError(error);
				setLoading(false);
			}
		};

		fetchProducts();
	}, []);

	return { products, loading, error };
};

export const useProduct = (productId) => {
	const [product, setProduct] = useState({});
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchProduct = async () => {
			try {
				const response = await apiClient.get(`/api/products/${productId}`);
				const data = await response.data;
				setProduct(data);
				setLoading(false);
			} catch (error) {
				setError(error);
				setLoading(false);
			}
		};

		fetchProduct();
	}, [productId]);

	return { product, loading, error };
};

export const useProductCategories = () => {
	const [categories, setCategories] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchCategories = async () => {
			try {
				const response = await apiClient.get('/api/products/categories');
				const data = await response.data;
				setCategories(data);
				setLoading(false);
			} catch (error) {
				setError(error);
				setLoading(false);
			}
		};

		fetchCategories();
	}, []);

	return { categories, loading, error };
};

export const usePostProduct = () => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const postProduct = async (product) => {
		setLoading(true);
		try {
			const response = await apiClient.post('/api/products', product);
			const data = await response.data;
			setLoading(false);
			return data;
		} catch (error) {
			setError(error);
			setLoading(false);
		}
	};

	return { postProduct, loading, error };
};

export const useUpdateProduct = (id) => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const modifyProduct = async (product) => {
		setLoading(true);
		try {
			const response = await apiClient.put(`/api/products/${id}`, product);
			const data = await response.data;
			setLoading(false);
			return data;
		} catch (error) {
			setError(error);
			setLoading(false);
		}
	};

	return { modifyProduct, loading, error };
};

export const useDeleteProduct = (id) => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const deleteProduct = async () => {
		setLoading(true);
		try {
			const response = await apiClient.delete(`/api/products/${id}`);
			const data = await response.data;
			setLoading(false);
			return data;
		} catch (error) {
			setError(error);
			setLoading(false);
		}
	};

	return { deleteProduct, loading, error };
};
