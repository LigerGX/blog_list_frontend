import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('blog title and author are rendered, but not url and likes by default', () => {
  const blog = {
    title: 'Blog Test',
    author: 'Test Man',
    likes: 43,
    url: 'testtest.com',
    user: {
      username: 'TestMaster'
    }
  }

  render(<Blog blog={blog} />)

  const title = screen.getByText('Blog Test', { exact: false })
  const author = screen.getByText('Test Man', { exact: false })
  const likes = screen.queryByText('43', { exact: false })
  const url = screen.queryByText('testtest.com', { exact: false })

  expect(title).toBeDefined()
  expect(author).toBeDefined()
  expect(likes).toBe(null)
  expect(url).toBe(null)
})

test('when view button is clicked, url and likes should be visible', async () => {
  const blog = {
    title: 'Blog Test',
    author: 'Test Man',
    likes: 43,
    url: 'testtest.com',
    user: {
      username: 'TestMaster'
    }
  }

  const user = userEvent.setup()

  render(<Blog blog={blog} />)

  const viewButton = screen.getByRole('button', { name: 'View' })
  await user.click(viewButton)

  const url = screen.getByText('testtest.com', { exact: false })
  const likes = screen.getByText('43', { exact: false })

  expect(url).toBeDefined()
  expect(likes).toBeDefined()
})

test('if like button is clicked twice, event handler is called twice', async () => {
  const blog = {
    title: 'Blog Test',
    author: 'Test Man',
    likes: 43,
    url: 'testtest.com',
    user: {
      username: 'TestMaster'
    }
  }

  const mockFunction = jest.fn()

  const user = userEvent.setup()

  render(<Blog blog={blog} likeBlog={mockFunction} />)

  const viewButton = screen.getByRole('button', { name: 'View' })
  await user.click(viewButton)
  const likeButton = screen.getByRole('button', { name: 'Like' })
  await user.click(likeButton)
  await user.click(likeButton)

  expect(mockFunction.mock.calls).toHaveLength(2)
})
