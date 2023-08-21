import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
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
			<h1 className="site-title">
				<Link to="/" className="text-white">
					Blog Collection
				</Link>
			</h1>
			<nav>
				<ul>
					<li>
						<Link to="/users" className="text-white">
							Users
						</Link>
					</li>
					<li>
						<Link to="/create" className="text-white">
							Submit
						</Link>
					</li>
				</ul>
			</nav>
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
