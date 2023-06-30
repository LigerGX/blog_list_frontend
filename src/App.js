import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )

    setUser(JSON.parse(window.localStorage.getItem('user')))
  }, [])

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('user')
  }

  if (!user) {
    return (
      <Login setUser={setUser} />
    )
  }

  return (
    <div>
      <h1>Blogs</h1>
      <p>{user.username} is logged in <span><button onClick={handleLogout}>Logout</button></span></p>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App