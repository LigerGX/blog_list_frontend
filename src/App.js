import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import AddBlog from './components/AddBlog'
import Notification from './components/Notification'
import Toggleable from './components/Toggleable'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)

  const toggleableRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs => {
      setBlogs(blogs.sort((a, b) => b.likes - a.likes))
    }
    )
  }, [])

  useEffect(() => {
    const userJSON = window.localStorage.getItem('user')

    if (userJSON) {
      const userParsed = JSON.parse(userJSON)
      setUser(userParsed)
      blogService.setToken(userParsed.token)
    }
  }, [])

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('user')
  }

  const likeBlog = async (blog) => {
    const updatedBlog = {
      author: blog.author,
      title: blog.title,
      url: blog.url,
      likes: blog.likes + 1,
    }

    try {
      const res = await blogService.update(updatedBlog, blog.id)
      const blogIndex = blogs.findIndex(item => {
        return item.id === blog.id
      })

      const newBlogs = [...blogs]
      newBlogs[blogIndex] = { ...res, user }
      setBlogs(newBlogs)
    } catch (error) {
      console.error(error.response.data)
    }
  }

  const removeBlog = async (blog) => {
    try {
      if (window.confirm(`Remove ${blog.title} by ${blog.author}?`)) {
        await blogService.remove(blog.id)
        setBlogs(blogs.filter(item => item.id !== blog.id))
      }
    } catch (error) {
      console.error.apply(error.response.data)
    }
  }

  const createBlog = async (title, author, url) => {
    try {
      const newBlog = await blogService.create({ title, author, url })
      // on GET request user info is populated  but not POST request
      // so user info is manually added when setBlog is used
      // so that the submitter can be seen when blog is first added
      setBlogs([...blogs, { ...newBlog, user }])
      showNotification(`New blog ${title} by ${author} added!`, false)
    } catch (error) {
      console.error(error.response.data)
    }
  }

  const showNotification = (message, error) => {
    setNotification({ message, error })
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  if (!user) {
    return (
      <Login setUser={setUser} notification={notification} showNotification={showNotification} />
    )
  }

  return (
    <div>
      <header data-cy="header">
        <h1>Blog Collection</h1>
        <p>{user.username} is logged in <span><button onClick={handleLogout}>Logout</button></span></p>
      </header>
      {notification && <Notification notification={notification} />}

      <Toggleable name={{ show: 'New Blog', hide: 'Cancel' }} ref={toggleableRef}>
        <AddBlog createBlog={createBlog} />
      </Toggleable>

      <div className="blog-list-container">
        {blogs.map(blog =>
          <Blog
            key={blog.id}
            blog={blog}
            removeBlog={removeBlog}
            likeBlog={likeBlog}
            user={user}
          />
        )}
      </div>
    </div>
  )
}

export default App