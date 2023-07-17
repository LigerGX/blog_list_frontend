// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('login', (username, password) => {
  const user = {
    username,
    password,
  }

  cy.request('POST', 'http://localhost:3003/api/login', user)
    .then(res => {
      if (window.localStorage.getItem('user')) {
        window.localStorage.removeItem('user')
      }
      window.localStorage.setItem('user', JSON.stringify(res.body))
      cy.visit('http://localhost:3000')
    })
})

Cypress.Commands.add('createUser', (username, password, name) => {
  cy.request('POST', 'http://localhost:3003/api/users', { username, password, name, })
})

Cypress.Commands.add('createBlog', (title, author, url) => {
  const blog = {
    title,
    author,
    url,
  }

  const options = {
    method: 'POST',
    url: 'http://localhost:3003/api/blogs',
    auth: {
      bearer: `${JSON.parse(localStorage.getItem('user')).token}`
    },
    body: blog,
  }

  cy.request(options)
})