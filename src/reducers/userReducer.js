import { createSlice } from '@reduxjs/toolkit';
import loginService from '../services/login';
import blogService from '../services/blogs';

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
		const user = await loginService.login(credentials);
		dispatch(setUser(user));
		blogService.setToken(user.token);
		window.localStorage.setItem('user', JSON.stringify(user));
	};
};

export const { setUser, resetUser } = userSlice.actions;
export default userSlice.reducer;
