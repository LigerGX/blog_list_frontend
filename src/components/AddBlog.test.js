import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AddBlog from './AddBlog';

test('when new blog is created, event handler is called with right details', async () => {
	const user = userEvent.setup();
	const mockFunction = jest.fn();
	render(<AddBlog createBlog={mockFunction} />);

	const titleInput = screen.getByLabelText('Title');
	const authorInput = screen.getByLabelText('Author');
	const urlInput = screen.getByLabelText('Url');
	const submitButton = screen.getByRole('button');

	await user.type(titleInput, 'Test Blog');
	await user.type(authorInput, 'Test Man');
	await user.type(urlInput, 'tester.com');
	await user.click(submitButton);

	expect(mockFunction.mock.calls).toHaveLength(1);
	expect(mockFunction.mock.calls[0][0]).toBe('Test Blog');
	expect(mockFunction.mock.calls[0][1]).toBe('Test Man');
	expect(mockFunction.mock.calls[0][2]).toBe('tester.com');
});
