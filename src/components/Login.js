import { useState } from "react"
import loginService from '../services/login'

const Login = ({ setUser }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleChange = (e) => {
    if (e.target.name === "username") {
      setUsername(e.target.value)
    } else {
      setPassword(e.target.value)
    }
  }

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      const user = await loginService.login({ username, password })
      setUsername('')
      setPassword('')
      setUser(user)
      window.localStorage.setItem('user', JSON.stringify(user))
    } catch (error) {
      console.error(error.response.data)
    }
  }

  return (
    <div>
      <form onSubmit={handleLogin}>
        <h2>Log in to application</h2>
        <div>
          <label>Username: </label>
          <input name="username" value={username} onChange={handleChange} />
        </div>

        <div>
          <label>Password: </label>
          <input type="password" name="password" value={password} onChange={handleChange} />
        </div>

        <button>Login</button>
      </form>
    </div>
  )
}

export default Login