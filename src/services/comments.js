import axios from 'axios';
import { token } from './serviceHelper';

const baseUrl = 'http://localhost:3000/api/blogs';

const getAll = async (id) => {
	const res = await axios.get(`${baseUrl}/${id}/comments`);
	return res.data;
};

const create = async (comment) => {
	const config = {
		headers: { Authorization: token },
	};

	const res = await axios.post(
		`${baseUrl}/${comment.id}/comments`,
		comment,
		config
	);

	return res.data;
};

const exportObject = { getAll, create };

export default exportObject;
