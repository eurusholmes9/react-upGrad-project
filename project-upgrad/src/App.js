import Layout from './common/layout/Layout';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/auth/';
import { FilterProvider } from './contexts/filter';
import { OrderProvider } from './contexts/order';
import LoginPage from './pages/LoginPage/LoginPage';
import SignupPage from './pages/SignupPage/SignupPage';
import ProductsPage from './pages/ProductsPage/ProductsPage';
import ProductDetailsPage from './pages/ProductDetailsPage/ProductDetailsPage';
import CreateOrderPage from './pages/CreateOrderPage/CreateOrderPage';
import AddProductPage from './pages/AddProductPage/AddProductPage';
import ModifyProductPage from './pages/ModifyProductPage/ModifyProductPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
	return (
		<AuthProvider>
			<FilterProvider>
				<OrderProvider>
					<Routes>
						<Route element={<Layout />}>
							<Route path='/' element={<ProductsPage />} />
							<Route path='/login' element={<LoginPage />} />
							<Route path='/signup' element={<SignupPage />} />
							<Route
								path='/products/:productId'
								element={<ProductDetailsPage />}
							/>
							<Route
								path='/products/:productId/modify'
								element={<ModifyProductPage />}
							/>
							<Route path='/order' element={<CreateOrderPage />} />
							<Route path='/add-product' element={<AddProductPage />} />
						</Route>
					</Routes>
					<ToastContainer />
				</OrderProvider>
			</FilterProvider>
		</AuthProvider>
	);
}

export default App;
