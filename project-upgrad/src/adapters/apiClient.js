import axios from 'axios';

const apiClient = axios.create({
	baseURL: 'http://localhost:8080',
	withCredentials: false,
	headers: {
		Accept: 'application/json',
		'Content-Type': 'application/json',
	},
});

apiClient.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem('token');
		if (token) {
			config.headers['x-auth-token'] = token.replace(/['"]+/g, '');
		}

		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

export default apiClient;
