import React from 'react';
import { Outlet } from 'react-router-dom';
import NavigationBar from '../../components/NavigationBar/NavigationBar';

const Layout = ({ children }) => {
	return (
		<main style={{ height: '100vh' }}>
			<NavigationBar />
			{children}

			<Outlet />
		</main>
	);
};

export default Layout;
