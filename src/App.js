import { useEffect, useRef, useContext } from 'react';
import { useQuery } from 'react-query';
import Blog from './components/Blog';
import Login from './components/Login';
import AddBlog from './components/AddBlog';
import Notification from './components/Notification';
import Toggleable from './components/Toggleable';
import blogService from './services/blogs';
import NotificationContext from './components/NotificationContext';
import UserContext from './components/UserContext';

const App = () => {
	// const [user, setUser] = useState(null);
	const [user, userDispatch] = useContext(UserContext);
	const [notification, notificationDispatch] = useContext(NotificationContext);
	const toggleableRef = useRef();

	useEffect(() => {
		const userJSON = window.localStorage.getItem('user');

		if (userJSON) {
			const userParsed = JSON.parse(userJSON);
			userDispatch({ type: 'SET', payload: userParsed });
			blogService.setToken(userParsed.token);
		}
	}, [userDispatch]);

	const res = useQuery('blogs', async () => {
		const res = await blogService.getAll();
		return res;
	});

	if (res.isLoading) {
		return <p>Loading...</p>;
	}

	const blogs = [...res.data].sort((a, b) => b.likes - a.likes);

	const handleLogout = () => {
		userDispatch({ type: 'RESET' });
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
			{notification && <Notification notification={notification} />}

			<Toggleable
				name={{ show: 'New Blog', hide: 'Cancel' }}
				ref={toggleableRef}
			>
				<AddBlog />
			</Toggleable>

			<div className="blog-list-container">
				{blogs.map((blog) => (
					<Blog key={blog.id} blog={blog} user={user} />
				))}
			</div>
		</div>
	);
};

export default App;
