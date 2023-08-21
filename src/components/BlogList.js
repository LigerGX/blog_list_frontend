import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import blogService from '../services/blogs';

const BlogList = () => {
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
					return (
						<div
							key={blog.id}
							className="blog-container"
							data-cy="blog-container"
						>
							<p>
								<Link to={`/blogs/${blog.id}`}>
									{blog.title} by {blog.author}
								</Link>
							</p>
						</div>
					);
				})}
		</div>
	);
};

export default BlogList;
