import { createSlice } from '@reduxjs/toolkit';
import blogsService from '../services/blogs';

const blogSlice = createSlice({
	name: 'blogs',
	initialState: [],
	reducers: {
		appendBlog(state, action) {
			return state.concat(action.payload);
		},
		setBlogs(state, action) {
			return action.payload;
		},
		replaceBlog(state, action) {
			const blogIndex = state.findIndex((blog) => {
				return blog.id === action.payload.id;
			});
			const stateCopy = [...state];
			stateCopy[blogIndex] = action.payload;
			return stateCopy;
		},
		deleteBlog(state, action) {
			return state.filter((blog) => blog.id !== action.payload);
		},
	},
});

export const initializeBlogs = () => {
	return async (dispatch) => {
		const blogs = await blogsService.getAll();
		dispatch(setBlogs(blogs));
	};
};

// need user info as POST calls do not populate the user field
export const createBlog = (blog, user) => {
	return async (dispatch) => {
		const res = await blogsService.create(blog);
		dispatch(appendBlog({ ...res, user }));
	};
};

export const updateBlog = (blog, id, user) => {
	return async (dispatch) => {
		const res = await blogsService.update(blog, id);
		dispatch(replaceBlog({ ...res, user }));
	};
};

export const removeBlog = (id) => {
	return async (dispatch) => {
		await blogsService.remove(id);
		dispatch(deleteBlog(id));
	};
};

export const { appendBlog, setBlogs, replaceBlog, deleteBlog } =
	blogSlice.actions;
export default blogSlice.reducer;
