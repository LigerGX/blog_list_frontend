import { createSlice } from '@reduxjs/toolkit';
import { setNotification } from './notificationReducer';
import loginService from '../services/login';
import { setToken } from '../services/serviceHelper';

const userSlice = createSlice({
	name: 'user',
	initialState: null,
	reducers: {
		setUser(state, action) {
			return action.payload;
		},
		resetUser(state, action) {
			return null;
		},
	},
});

export const loginUser = (credentials) => {
	return async (dispatch) => {
		try {
			const user = await loginService.login(credentials);
			dispatch(setUser(user));
			setToken(user.token);
			window.localStorage.setItem('user', JSON.stringify(user));
		} catch (error) {
			dispatch(
				setNotification({
					message: `${error.response.data.error}`,
					error: true,
				})
			);
		}
	};
};

export const { setUser, resetUser } = userSlice.actions;
export default userSlice.reducer;
