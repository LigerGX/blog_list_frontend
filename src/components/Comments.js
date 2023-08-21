import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import commentsService from '../services/comments';
import AddComent from './AddComment';

const Comments = () => {
	const blogId = useParams().id;
	const commentsQuery = useQuery('comments', async () => {
		return await commentsService.getAll(blogId);
	});

	if (commentsQuery.isLoading) {
		return <p>Loading...</p>;
	}

	const comments = commentsQuery.data;

	return (
		<div>
			<h2>Comments</h2>
			<AddComent />
			<ul>
				{comments.map((comment) => {
					return <li key={comment.id}>{comment.content}</li>;
				})}
			</ul>
		</div>
	);
};

export default Comments;
