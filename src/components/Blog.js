import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, blogs, setBlogs, user }) => {
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const handleUpdate = async () => {
    const updatedBlog = {
      author: blog.author,
      title: blog.title,
      url: blog.url,
      likes: blog.likes + 1,
    }

    try {
      const res = await blogService.update(updatedBlog, blog.id)
      const filteredBlogs = blogs.filter(item => item.id !== blog.id)
      setBlogs([...filteredBlogs, { ...res, user }])
    } catch (error) {
      console.error(error.response.data)
    }
  }

  const handleRemove = async () => {
    try {
      if (window.confirm(`Remove ${blog.title} by ${blog.author}?`)) {
        await blogService.remove(blog.id)
        setBlogs(blogs.filter(item => item.id !== blog.id))
      }
    } catch (error) {
      console.error.apply(error.response.data)
    }
  }

  if (!visible) {
    return (
      <div className="blogContainer">
        <p>{blog.title} by {blog.author} <span><button onClick={toggleVisibility}>View</button></span></p>
      </div>
    )
  }

  return (
    <div className="blogContainer">
      <p>{blog.title} by {blog.author} <span><button onClick={toggleVisibility}>Hide</button></span></p>
      <p>url: {blog.url}</p>
      <p>Likes: {blog.likes} <span><button onClick={handleUpdate}>Like</button></span></p>
      <p>Submitted by {blog.user.username}</p>
      <button onClick={handleRemove}>Remove</button>
    </div>
  )
}

export default Blog