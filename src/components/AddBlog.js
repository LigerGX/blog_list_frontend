import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setNotification } from '../reducers/notificationReducer';
import { useMutation, useQueryClient } from 'react-query';
import blogService from '../services/blogs';

const AddBlog = () => {
	const [title, setTitle] = useState('');
	const [author, setAuthor] = useState('');
	const [url, setUrl] = useState('');
	const [visibility, setVisibility] = useState(false);
	const dispatch = useDispatch();

	const queryClient = useQueryClient();
	const addMutation = useMutation(
		(newBlog) => {
			return blogService.create(newBlog);
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
		addMutation.mutate({ title, author, url });
		dispatch(
			setNotification({
				message: `Added ${title} by ${author}`,
				error: false,
			})
		);
		setTitle('');
		setAuthor('');
		setUrl('');
	};

	const toggleVisibility = (e) => {
		e.preventDefault();
		setVisibility(!visibility);
	};

	if (!visibility) {
		return (
			<div className="add-blog-container">
				<button onClick={toggleVisibility}>New Blog</button>
			</div>
		);
	}

	return (
		<div className="add-blog-container">
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
				<div className="add-blog-buttons-container">
					<button data-cy="add">Add</button>
					<button onClick={toggleVisibility}>Cancel</button>
				</div>
			</form>
		</div>
	);
};

export default AddBlog;
