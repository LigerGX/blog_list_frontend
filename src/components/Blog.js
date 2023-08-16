import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import blogsService from '../services/blogs';

const Blog = ({ blog, user }) => {
	const [visible, setVisible] = useState(false);
	const queryClient = useQueryClient();

	const likeMutation = useMutation(
		(updatedBlog) => {
			return blogsService.update(updatedBlog, blog.id);
		},
		{
			onSuccess: () => queryClient.invalidateQueries(),
		}
	);

	const removeMutation = useMutation(
		() => {
			return blogsService.remove(blog.id);
		},
		{
			onSuccess: () => queryClient.invalidateQueries(),
		}
	);

	const toggleVisibility = () => {
		setVisible(!visible);
	};

	const likeBlog = () => {
		likeMutation.mutate({
			title: blog.title,
			author: blog.author,
			url: blog.url,
			likes: blog.likes + 1,
		});
	};

	const removeBlog = () => {
		if (window.confirm(`Remove ${blog.title} by ${blog.author}?`)) {
			removeMutation.mutate();
		}
	};

	if (!visible) {
		return (
			<div className="blog-container" data-cy="blog-container">
				<p>
					{blog.title} by {blog.author}{' '}
					<span>
						<button onClick={toggleVisibility}>View</button>
					</span>
				</p>
			</div>
		);
	}

	return (
		<div className="blog-container" data-cy="blog-container">
			<p>
				{blog.title} by {blog.author}{' '}
				<span>
					<button onClick={toggleVisibility}>Hide</button>
				</span>
			</p>
			<p>url: {blog.url}</p>
			<p>
				Likes: {blog.likes}{' '}
				<span>
					<button onClick={() => likeBlog(blog)}>Like</button>
				</span>
			</p>
			<p>Submitted by {blog.user.username}</p>
			{blog.user.id === user.id && (
				<button onClick={() => removeBlog(blog)}>Remove</button>
			)}
		</div>
	);
};

export default Blog;
