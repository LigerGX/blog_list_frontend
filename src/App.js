import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from './reducers/userReducer';
import blogService from './services/blogs';
import Login from './components/Login';
import AddBlog from './components/AddBlog';
import Notification from './components/Notification';
import BlogList from './components/BlogList';
import Footer from './components/Footer';
import Header from './components/Header';

const App = () => {
	const user = useSelector((state) => state.user);
	const notification = useSelector((state) => state.notification);
	const dispatch = useDispatch();

	useEffect(() => {
		const userJSON = window.localStorage.getItem('user');
		if (userJSON !== null) {
			const userParsed = JSON.parse(userJSON);
			blogService.setToken(userParsed.token);
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
				<AddBlog user={user} />
				<BlogList user={user} />
			</main>
			<Footer />
		</div>
	);
};

export default App;
