import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import usersService from '../services/users';

const Users = () => {
	const res = useQuery('users', async () => {
		return await usersService.getAll();
	});

	if (res.isLoading) {
		return <p>Loading users...</p>;
	}

	const users = res.data;

	return (
		<div>
			<h2>Users</h2>
			<div>
				<table>
					<thead>
						<tr>
							<th>Username</th>
							<th>Blogs Submitted</th>
						</tr>
					</thead>
					<tbody>
						{users.map((user) => {
							return (
								<tr key={user.id}>
									<th>
										<Link to={`/users/${user.id}`} className="text-dark">
											{user.username}
										</Link>
									</th>
									<th>{user.blogs.length}</th>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default Users;
