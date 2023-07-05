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
      setBlogs(blogs)
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
      <header>
        <h1>Blog Collection</h1>
        <p>{user.username} is logged in <span><button onClick={handleLogout}>Logout</button></span></p>
      </header>
      {notification && <Notification notification={notification} />}

      <Toggleable name={{ show: 'New Blog', hide: 'Cancel' }} ref={toggleableRef}>
        <AddBlog blogs={blogs} setBlogs={setBlogs} showNotification={showNotification} user={user} />
      </Toggleable>

      {blogs.sort((a,b) => b.likes - a.likes).map(blog =>
        <Blog key={blog.id} blog={blog} blogs={blogs} setBlogs={setBlogs} user={user} />
      )}
    </div>
  )
}

export default App