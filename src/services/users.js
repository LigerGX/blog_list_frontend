import axios from 'axios';

const baseUrl = 'http://localhost:3000/api/users';

const getAll = async () => {
	const res = await axios.get(baseUrl);
	return res.data;
};

const getOne = async (id) => {
	const res = await axios.get(`${baseUrl}/${id}`);
	return res.data;
};

const exportObject = {
	getAll,
	getOne,
};

export default exportObject;
