import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from './reducers/userReducer';
import { Routes, Route } from 'react-router-dom';
import { setToken } from './services/serviceHelper';
import blogService from './services/blogs';
import Login from './components/Login';
import AddBlog from './components/AddBlog';
import Notification from './components/Notification';
import BlogList from './components/BlogList';
import Footer from './components/Footer';
import Header from './components/Header';
import Users from './components/Users';
import User from './components/User';
import Blog from './components/Blog';

const App = () => {
	const user = useSelector((state) => state.user);
	const notification = useSelector((state) => state.notification);
	const dispatch = useDispatch();

	useEffect(() => {
		const userJSON = window.localStorage.getItem('user');
		if (userJSON !== null) {
			const userParsed = JSON.parse(userJSON);
			setToken(userParsed.token);
			dispatch(setUser(userParsed));
		}
	}, [dispatch]);

	if (!user) {
		return (
			<div className="main-layout">
				<Header />
				<main>
					<Login notification={notification} />
				</main>
				<Footer />
			</div>
		);
	}

	return (
		<div className="main-layout">
			<Header />
			<main>
				{notification && <Notification />}
				<Routes>
					<Route path="/create" element={<AddBlog />} />
					<Route path="/users" element={<Users />} />
					<Route path="/users/:id" element={<User />} />
					<Route path="blogs/:id" element={<Blog />} />
					<Route path="/" element={<BlogList />} />
				</Routes>
			</main>
			<Footer />
		</div>
	);
};

export default App;
