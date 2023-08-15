import { useSelector } from 'react-redux';
import Blog from './Blog';

const BlogList = ({ user }) => {
	// sort method will modify the state in place which is not allowed since that
	// would violate the immutabiliy requirement of the state, so a copy is made
	const blogs = useSelector((state) => state.blogs);
	const blogsCopy = [...blogs];

	return (
		<div>
			{blogsCopy
				.sort((a, b) => b.likes - a.likes)
				.map((blog) => {
					return <Blog key={blog.id} blog={blog} user={user} />;
				})}
		</div>
	);
};

export default BlogList;
