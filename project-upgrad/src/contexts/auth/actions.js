import apiClient from '../../adapters/apiClient';

export async function loginUser(dispatch, loginPayload) {
	try {
		dispatch({ type: 'REQUEST_LOGIN' });
		let response = await apiClient.post(`/api/auth/signin`, loginPayload);

		if (response) {
			let data = response.data;
			dispatch({ type: 'LOGIN_SUCCESS', payload: data });
			localStorage.setItem('token', JSON.stringify(data.token));
			localStorage.setItem(
				'user',
				JSON.stringify({
					id: data.id,
					roles: data.roles,
				})
			);
			return data;
		}

		dispatch({ type: 'LOGIN_ERROR', error: response.error });
		return;
	} catch (error) {
		dispatch({ type: 'LOGIN_ERROR', error: error });
	}
}

export async function logout(dispatch) {
	dispatch({ type: 'LOGOUT' });
	try {
		localStorage.removeItem('token');
		localStorage.removeItem('user');
		return true;
	} catch (error) {
		console.log(error);
		return false;
	}
}

export async function signupUser(dispatch, registerPayload) {
	try {
		dispatch({ type: 'REQUEST_REGISTER' });
		let response = await apiClient.post(`/api/auth/signup`, registerPayload);

		let data = await response.json();

		if (response.status === 200) {
			dispatch({ type: 'REGISTER_SUCCESS' });
			return;
		}

		dispatch({ type: 'REGISTER_ERROR', error: data.errors[0] });
		return;
	} catch (error) {
		dispatch({ type: 'REGISTER_ERROR', error: error });
	}
}
