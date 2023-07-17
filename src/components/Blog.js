import { useState } from 'react'

const Blog = ({ blog, removeBlog, likeBlog, user }) => {
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  if (!visible) {
    return (
      <div className="blog-container" data-cy="blog-container">
        <p>{blog.title} by {blog.author} <span><button onClick={toggleVisibility}>View</button></span></p>
      </div>
    )
  }

  return (
    <div className="blog-container" data-cy="blog-container">
      <p>{blog.title} by {blog.author} <span><button onClick={toggleVisibility}>Hide</button></span></p>
      <p>url: {blog.url}</p>
      <p>Likes: {blog.likes} <span><button onClick={() => likeBlog(blog)}>Like</button></span></p>
      <p>Submitted by {blog.user.username}</p>
      {blog.user.id === user.id && <button onClick={() => removeBlog(blog)}>Remove</button>}
    </div>
  )
}

export default Blog