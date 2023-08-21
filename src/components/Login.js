import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../reducers/userReducer';
import Notification from './Notification';

const Login = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const notification = useSelector((state) => state.notification);
	const dispatch = useDispatch();

	const handleChange = (e) => {
		if (e.target.name === 'username') {
			setUsername(e.target.value);
		} else {
			setPassword(e.target.value);
		}
	};

	const handleLogin = async (e) => {
		e.preventDefault();

		dispatch(loginUser({ username, password }));
		setUsername('');
		setPassword('');
	};

	return (
		<div>
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
