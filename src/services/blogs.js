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

const update = async (updatedBlog, id) => {
  const config = {
    headers: { Authorizaiton: token }
  }
  const res = await axios.put(`${baseUrl}/${id}`, updatedBlog, config)
  return res.data
}

const remove = async (id) => {
  const config = {
    headers: { Authorization: token }
  }
  const res = await axios.delete(`${baseUrl}/${id}`, config)
  return res.data
}

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

export default { getAll, create, update, remove, setToken }