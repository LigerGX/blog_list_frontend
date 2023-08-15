import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createBlog } from '../reducers/blogsReducer';
import { setNotification } from '../reducers/notificationReducer';

const AddBlog = ({ user }) => {
	const [title, setTitle] = useState('');
	const [author, setAuthor] = useState('');
	const [url, setUrl] = useState('');
	const dispatch = useDispatch();

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
		dispatch(createBlog({ title, author, url }, user));
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
