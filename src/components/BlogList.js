import { useQuery } from 'react-query';
import blogService from '../services/blogs';
import Blog from './Blog';

const BlogList = ({ user }) => {
	const blogQuery = useQuery('blogs', async () => {
		return await blogService.getAll();
	});

	if (blogQuery.isLoading) {
		return <p>Loading...</p>;
	}

	const blogs = blogQuery.data;

	return (
		<div className="bloglist-container">
			{blogs
				.sort((a, b) => b.likes - a.likes)
				.map((blog) => {
					return <Blog key={blog.id} blog={blog} user={user} />;
				})}
		</div>
	);
};

export default BlogList;
