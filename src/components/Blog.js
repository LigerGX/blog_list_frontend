import { useState } from "react"

const Blog = ({blog}) => {
  const [visible, setVisible] = useState(false)
  const toggleVisibility = () => {
    setVisible(!visible)
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
      <p>Likes: {blog.likes} <span><button>Like</button></span></p>
      <p>Submitted by {blog.user.username}</p>
    </div>
  )
}

export default Blog