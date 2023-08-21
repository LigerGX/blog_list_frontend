import { useState } from 'react';
import { useQueryClient, useMutation } from 'react-query';
import { useParams } from 'react-router-dom';
import commentsService from '../services/comments';

const AddComment = () => {
	const [comment, setComment] = useState('');

	const queryClient = useQueryClient();

	const commentMutation = useMutation(
		(newComment) => {
			return commentsService.create(newComment);
		},
		{
			onSuccess: () => queryClient.invalidateQueries('comments'),
		}
	);

	const blogId = useParams().id;

	const handleChange = (e) => {
		setComment(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		commentMutation.mutate({ content: comment, id: blogId });
		setComment('');
	};

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<div>
					<input
						style={{ backgroundColor: '#e0e0e0' }}
						value={comment}
						onChange={handleChange}
					/>
				</div>
				<button>Add Comment</button>
			</form>
		</div>
	);
};

export default AddComment;
