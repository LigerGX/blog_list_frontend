import { useState, useContext } from 'react';
import loginService from '../services/login';
import blogService from '../services/blogs';
import Notification from './Notification';
import NotificationContext from './NotificationContext';
import UserContext from './UserContext';

const Login = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [notification, notificationDispatch] = useContext(NotificationContext);
	const [user, userDispatch] = useContext(UserContext);

	const handleChange = (e) => {
		if (e.target.name === 'username') {
			setUsername(e.target.value);
		} else {
			setPassword(e.target.value);
		}
	};

	const handleLogin = async (e) => {
		e.preventDefault();

		try {
			const res = await loginService.login({ username, password });
			setUsername('');
			setPassword('');
			userDispatch({ type: 'SET', payload: res });
			window.localStorage.setItem('user', JSON.stringify(res));
			blogService.setToken(res.token);
		} catch (error) {
			notificationDispatch({
				type: 'SET',
				payload: {
					message: `${error.response.data.error}`,
					error: true,
				},
			});
			console.error(error.response.data);
		}
	};

	return (
		<div>
			<header>
				<h1>Blog Collection</h1>
			</header>
			<form onSubmit={handleLogin}>
				<h2>Log in to application</h2>
				{notification && <Notification notification={notification} />}
				<div>
					<label htmlFor="username">Username: </label>
					<input
						name="username"
						id="username"
						data-cy="username"
						value={username}
						onChange={handleChange}
					/>
				</div>

				<div>
					<label htmlFor="password">Password: </label>
					<input
						type="password"
						name="password"
						id="password"
						data-cy="password"
						value={password}
						onChange={handleChange}
					/>
				</div>

				<button id="login-button" data-cy="login">
					Login
				</button>
			</form>
		</div>
	);
};

export default Login;
