import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import usersService from '../services/users';

const User = () => {
	const userId = useParams().id;
	const res = useQuery('user', async () => {
		return await usersService.getOne(userId);
	});

	if (res.isLoading) {
		return <p>Loading...</p>;
	}

	const user = res.data;

	return (
		<div>
			<h2>{user.username}</h2>
			<h3>Blogs Submitted</h3>
			{user.blogs.length > 0 && (
				<div>
					<ul>
						{user.blogs.map((blog) => {
							return <li key={blog.id}>{blog.title}</li>;
						})}
					</ul>
				</div>
			)}
			{user.blogs.length === 0 && (
				<p>{user.username} has not submitted any blogs yet!</p>
			)}
		</div>
	);
};

export default User;
