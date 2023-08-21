import axios from 'axios';
import { token } from './serviceHelper';

const baseUrl = 'http://localhost:3000/api/blogs';

const getAll = async () => {
	const res = await axios.get(baseUrl);
	return res.data;
};

const getOne = async (id) => {
	const res = await axios.get(`${baseUrl}/${id}`);
	return res.data;
};

const create = async (newBlog) => {
	const config = {
		headers: { Authorization: token },
	};
	const res = await axios.post(baseUrl, newBlog, config);
	return res.data;
};

const update = async (updatedBlog, id) => {
	const config = {
		headers: { Authorizaiton: token },
	};
	const res = await axios.put(`${baseUrl}/${id}`, updatedBlog, config);
	return res.data;
};

const remove = async (id) => {
	const config = {
		headers: { Authorization: token },
	};
	const res = await axios.delete(`${baseUrl}/${id}`, config);
	return res.data;
};

const exportObject = { getAll, create, update, remove, getOne };

export default exportObject;
