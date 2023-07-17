import { useState } from 'react'
import loginService from '../services/login'
import blogService from '../services/blogs'
import Notification from './Notification'

const Login = ({ setUser, notification, showNotification }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleChange = (e) => {
    if (e.target.name === 'username') {
      setUsername(e.target.value)
    } else {
      setPassword(e.target.value)
    }
  }

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      const user = await loginService.login({ username, password })
      console.log(user)
      setUsername('')
      setPassword('')
      setUser(user)
      window.localStorage.setItem('user', JSON.stringify(user))
      blogService.setToken(user.token)
    } catch (error) {
      showNotification(`${error.response.data.error}`, true)
      console.error(error.response.data)
    }
  }

  return (
    <div>
      <header>
        <h1>Blog Collection</h1>
      </header>
      <form onSubmit={handleLogin}>
        <h2>Log in to application</h2>
        {notification && <Notification notification={notification} />}
        <div>
          <label htmlFor="username">Username: </label>
          <input
            name="username"
            id="username"
            data-cy="username"
            value={username}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            name="password"
            id="password"
            data-cy="password"
            value={password}
            onChange={handleChange}
          />
        </div>

        <button id="login-button" data-cy="login">Login</button>
      </form>
    </div>
  )
}

export default Login