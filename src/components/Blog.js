import { useMutation, useQueryClient, useQuery } from 'react-query';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import blogService from '../services/blogs';
import Comments from './Comments';

const Blog = () => {
	const navigate = useNavigate();

	const queryClient = useQueryClient();
	const likeMutation = useMutation(
		(update) => {
			return blogService.update(update.data, update.id);
		},
		{
			onSuccess: () => queryClient.invalidateQueries(),
		}
	);

	const removeMutation = useMutation(
		(id) => {
			return blogService.remove(id);
		},
		{
			onSuccess: () => queryClient.invalidateQueries(),
		}
	);

	const user = useSelector((state) => state.user);

	const blogId = useParams().id;

	const res = useQuery('blog', async () => {
		const result = await blogService.getOne(blogId);
		return result;
	});

	if (res.isLoading) {
		return <p>Loading...</p>;
	}

	const blog = res.data;

	const likeBlog = async (blog) => {
		const updatedBlog = {
			author: blog.author,
			title: blog.title,
			url: blog.url,
			likes: blog.likes + 1,
		};

		try {
			likeMutation.mutate({ data: updatedBlog, id: blog.id });
		} catch (error) {
			console.error(error.response.data);
		}
	};

	const deleteBlog = async (blog) => {
		try {
			if (window.confirm(`Remove ${blog.title} by ${blog.author}?`)) {
				removeMutation.mutate(blog.id);
				navigate('/');
			}
		} catch (error) {
			console.error.apply(error.response.data);
		}
	};

	return (
		<div className="blog-container" data-cy="blog-container">
			<h2>
				{blog.title} by {blog.author}
			</h2>
			<p>url: {blog.url}</p>
			<p>
				Likes: {blog.likes}{' '}
				<span>
					<button onClick={() => likeBlog(blog)}>Like</button>
				</span>
			</p>
			<p>Submitted by {blog.user.username}</p>
			{blog.user.id === user.id && (
				<button className="remove-button" onClick={() => deleteBlog(blog)}>
					Remove
				</button>
			)}
			<Comments />
		</div>
	);
};

export default Blog;
