import React from 'react';
import ProductCard from '../../components/ProductCard/ProductCard';
import ToggleButton from '../../components/ToggleButton/ToggleButton';
import CategoryFilter from '../../components/CategoryFilter/CategoryFilter';
import Box from '@mui/material/Box';
import { useProducts } from '../../hooks/useProducts';
import { useFilterState } from '../../contexts/filter';
const ProductsPage = () => {
	const { category, sortBy, search } = useFilterState();

	const { products, loading, error } = useProducts();

	if (loading) return <div>Loading...</div>;

	if (error) return <div>Something went wrong: {error.message}</div>;

	const filterAndSortProducts = (products, ...args) => {
		// Filter products by category
		let filteredProducts = products;
		const [filterCategory, sortBy, search] = args;

		if (filterCategory && filterCategory !== 'all') {
			filteredProducts = products.filter(
				(product) => product.category === filterCategory
			);
		}

		// Search products
		if (search !== '') {
			console.log(search);
			filteredProducts = filteredProducts.filter((product) =>
				product.name.toLowerCase().includes(search.toLowerCase())
			);
		}

		// Sort products
		if (sortBy === 'asc') {
			filteredProducts.sort((a, b) => a.price - b.price);
		} else if (sortBy === 'desc') {
			filteredProducts.sort((a, b) => b.price - a.price);
		} else if (sortBy === 'default') {
			return filteredProducts;
		}

		return filteredProducts;
	};

	const filteredAndSortedProducts = filterAndSortProducts(
		products,
		category,
		sortBy,
		search
	);

	return (
		<Box
			display={'flex'}
			flexDirection={'column'}
			alignItems={'center'}
			gap={8}
			maxWidth={'1440px'}
			margin={'0 auto'}>
			<ToggleButton />
			<CategoryFilter />
			<Box
				display={'flex'}
				flexWrap={'wrap'}
				gap={12}
				alignItems={'center'}
				paddingX={8}
				maxWidth={'1280px'}>
				{filteredAndSortedProducts.map((product) => (
					<ProductCard key={product.id} product={product} />
				))}
			</Box>
		</Box>
	);
};

export default ProductsPage;
