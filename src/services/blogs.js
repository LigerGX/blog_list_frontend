import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const getAll = () => {
  const req = axios.get(baseUrl)
  return req.then(res => res.data)
}

const create = async (newBlog) => {
  const config = {
    headers: { Authorization: token }
  }
  const res = await axios.post(baseUrl, newBlog, config)
  return res.data
}

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, create, setToken }