import { useState } from 'react';

const AddBlog = ({ createBlog }) => {
	const [title, setTitle] = useState('');
	const [author, setAuthor] = useState('');
	const [url, setUrl] = useState('');

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
		await createBlog(title, author, url);
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
