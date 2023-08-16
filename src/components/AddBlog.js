import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useContext } from 'react';
import NotificationContext from './NotificationContext';
import blogsService from '../services/blogs';

const AddBlog = () => {
	const [title, setTitle] = useState('');
	const [author, setAuthor] = useState('');
	const [url, setUrl] = useState('');

	const [notification, notificationDispatch] = useContext(NotificationContext);
	const queryClient = useQueryClient();

	const mutation = useMutation(
		(newBlog) => {
			return blogsService.create(newBlog);
		},
		{
			onSuccess: () => queryClient.invalidateQueries('blogs'),
		}
	);

	const handleChange = (e) => {
		switch (e.target.name) {
			case 'title':
				setTitle(e.target.value);
				break;
			case 'author':
				setAuthor(e.target.value);
				break;
			case 'url':
				setUrl(e.target.value);
				break;
			default:
				console.log('Should not see this');
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		mutation.mutate({ title, author, url });
		notificationDispatch({
			type: 'SET',
			payload: {
				message: `Added ${title} by ${author}`,
				error: false,
			},
		});
		setTitle('');
		setAuthor('');
		setUrl('');
	};

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<h2>Add Blog</h2>
				<div>
					<label htmlFor="title">Title</label>
					<input
						name="title"
						id="title"
						data-cy="title"
						value={title}
						onChange={handleChange}
					/>
				</div>

				<div>
					<label htmlFor="author">Author</label>
					<input
						name="author"
						id="author"
						data-cy="author"
						value={author}
						onChange={handleChange}
					/>
				</div>

				<div>
					<label htmlFor="url">Url</label>
					<input
						name="url"
						id="url"
						data-cy="url"
						value={url}
						onChange={handleChange}
					/>
				</div>
				<button data-cy="add">Add</button>
			</form>
		</div>
	);
};

export default AddBlog;
