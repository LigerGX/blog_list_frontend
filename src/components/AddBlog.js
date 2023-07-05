import { useState } from 'react'
import blogService from '../services/blogs'

const AddBlog = ({ blogs, setBlogs, showNotification, user }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleChange = (e) => {
    switch (e.target.name) {
    case 'title':
      setTitle(e.target.value)
      break
    case 'author':
      setAuthor(e.target.value)
      break
    case 'url':
      setUrl(e.target.value)
      break
    default:
      console.log('Should not see this')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const newBlog = await blogService.create({ title, author, url })
      // on GET request user info is populated  but not POST request
      // so user info is manually added when setBlog is used
      // so that the submitter can be seen when blog is first added
      setBlogs([...blogs, { ...newBlog, user }])
      showNotification(`New blog ${title} by ${author} added!`, false)
      setTitle('')
      setAuthor('')
      setUrl('')
    } catch (error) {
      console.error(error.response.data)
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Add Blog</h2>
        <div>
          <label>Title</label>
          <input name="title" value={title} onChange={handleChange}></input>
        </div>

        <div>
          <label>Author</label>
          <input name="author" value={author} onChange={handleChange}></input>
        </div>

        <div>
          <label>Url</label>
          <input name="url" value={url} onChange={handleChange}></input>
        </div>
        <button>Add</button>
      </form>
    </div>
  )
}

export default AddBlog