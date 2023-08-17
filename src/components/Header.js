import { useSelector, useDispatch } from 'react-redux';
import { resetUser } from '../reducers/userReducer';

const Header = () => {
	const user = useSelector((state) => state.user);
	const dispatch = useDispatch();

	const handleLogout = () => {
		dispatch(resetUser());
		window.localStorage.removeItem('user');
	};

	return (
		<header className="header-container" data-cy="header">
			<h1>Blog Collection</h1>
			{user && (
				<p>
					{user.username} is logged in{' '}
					<span>
						<button onClick={handleLogout}>Logout</button>
					</span>
				</p>
			)}
		</header>
	);
};

export default Header;
