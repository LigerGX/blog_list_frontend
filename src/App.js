import { useEffect, useRef } from 'react';
import Login from './components/Login';
import AddBlog from './components/AddBlog';
import Notification from './components/Notification';
import Toggleable from './components/Toggleable';
import BlogList from './components/BlogList';
import blogService from './services/blogs';
import { useDispatch, useSelector } from 'react-redux';
import { initializeBlogs } from './reducers/blogsReducer';
import { setUser, resetUser } from './reducers/userReducer';

const App = () => {
	// const [user, setUser] = useState(null);
	const user = useSelector((state) => state.user);
	const notification = useSelector((state) => state.notification);
	const dispatch = useDispatch();
	const toggleableRef = useRef();

	useEffect(() => {
		dispatch(initializeBlogs());
	}, [dispatch]);

	useEffect(() => {
		const userJSON = window.localStorage.getItem('user');
		if (userJSON !== 'null') {
			const userParsed = JSON.parse(userJSON);
			blogService.setToken(userParsed.token);
			dispatch(setUser(userParsed));
		}
	}, []);

	const handleLogout = () => {
		dispatch(resetUser());
		window.localStorage.removeItem('user');
	};

	if (!user) {
		return <Login notification={notification} />;
	}

	return (
		<div>
			<header data-cy="header">
				<h1>Blog Collection</h1>
				<p>
					{user.username} is logged in{' '}
					<span>
						<button onClick={handleLogout}>Logout</button>
					</span>
				</p>
			</header>
			{notification && <Notification />}

			<Toggleable
				name={{ show: 'New Blog', hide: 'Cancel' }}
				ref={toggleableRef}
			>
				<AddBlog user={user} />
			</Toggleable>

			<BlogList user={user} />
		</div>
	);
};

export default App;
