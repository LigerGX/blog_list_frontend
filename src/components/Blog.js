import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useMutation, useQueryClient } from 'react-query';
import blogService from '../services/blogs';

const Blog = ({ blog, user }) => {
	const [visible, setVisible] = useState(false);
	const dispatch = useDispatch();

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

	const toggleVisibility = () => {
		setVisible(!visible);
	};

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
			}
		} catch (error) {
			console.error.apply(error.response.data);
		}
	};

	if (!visible) {
		return (
			<div className="blog-container" data-cy="blog-container">
				<p>
					{blog.title} by {blog.author}{' '}
				</p>
				<button onClick={toggleVisibility}>View</button>
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
				<button className="remove-button" onClick={() => deleteBlog(blog)}>
					Remove
				</button>
			)}
		</div>
	);
};

export default Blog;
