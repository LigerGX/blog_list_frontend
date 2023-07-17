describe('Blog App', () => {
  beforeEach(() => {
    cy.request('POST', 'http:localhost:3003/api/testing/reset')
    cy.createUser('TestMan', 'test123', 'Test Man')
    cy.visit('http://localhost:3000/')
  })

  it('Login form  is shown', () => {
    cy.contains('Log in to application')
  })

  describe('Login', () => {
    it('succeeds with correct credentials', () => {
      cy.get('[data-cy="username"]').type('TestMan')
      cy.get('[data-cy="password"]').type('test123')
      cy.get('[data-cy="login"]').click()
      cy.contains('TestMan is logged in')
    })

    it('fails with incorrect credentials', () => {
      cy.get('[data-cy="username"]').type('TestBoy')
      cy.get('[data-cy="password"]').type('test132')
      cy.get('[data-cy="login"]').click()
      cy.get('[data-cy="notification"')
        .should('contain', 'invalid username or password')
        .and('have.css', 'color', 'rgb(224, 31, 31)')
        .and('have.css', 'border', '3px solid rgb(224, 31, 31)')
    })
  })

  describe('When logged in', () => {
    beforeEach(() => {
      cy.login('TestMan', 'test123')
    })

    it('A blog can be created', () => {
      cy.contains('New Blog').click()
      cy.get('[data-cy="title"]').type('Cypress Test')
      cy.get('[data-cy="author"]').type('Kamyu Tanaka')
      cy.get('[data-cy="url"]').type('http://cypress.io')
      cy.get('[data-cy="add"]').click()
      cy.get('[data-cy="blog-container"]').should('contain', 'Cypress Test by Kamyu Tanaka')
    })

    describe('Blogs exist', () => {
      beforeEach(() => {
        cy.createBlog('Cypress Test', 'Kamyu Tanaka', 'http://cypress.io')
        cy.createBlog('Dummy Blog', 'Fitzgerald Lane', 'http://dummysite.com')
        cy.createBlog('The Third Blog', 'Xavier the Third', 'http://trianglelovers.com')
        cy.visit('http://localhost:3000')
      })

      it('Can like a blog', () => {
        cy.get('[data-cy="blog-container"]').first().within(() => {
          cy.contains('View').click()
          cy.contains('Likes: 0')
          cy.contains('Like').click()
          cy.contains('Likes: 1')
        })
      })

      it('User who created blog can delete it', () => {
        cy.get('[data-cy="blog-container"]')
          .last()
          .as('targetContainer')
          .within(() => {
            cy.contains('View').click()
            cy.contains('Remove').click()
          })

        cy.get('targetContainer').should('not.exist')
      })

      it('Only user who created blog can see remove button', () => {
        cy.createUser('Intruder', 'sneaky123', 'Balthasar Gerard')
        cy.login('Intruder', 'sneaky123')

        cy.get('[data-cy="header"]').should('contain', 'Intruder is logged in')
        cy.get('[data-cy="blog-container"]')
          .first()
          .as('targetContainer')
          .within(() => {
            cy.contains('View').click()
            cy.contains('Submitted by TestMan')
            cy.contains('Remove').should('not.exist')
          })
      })

      it.only('Blogs are sorted by number of likes descending', () => {
        cy.get('[data-cy="blog-container"]')
          .last()
          .within(() => {
            cy.contains('View').click()
            cy.contains('Like').click()
            // must wait or second click will not be registered
            cy.wait(200)
            cy.contains('Like').click()
          })

        cy.get('[data-cy="blog-container"]')
          .first()
          .within(() => {
            cy.contains('View').click()
            cy.contains('Like').click()
          })

        cy.visit('http://localhost:3000')
        cy.get('[data-cy="blog-container"]')
          .eq(0)
          .should('contain', 'The Third Blog by Xavier the Third')
        cy.get('[data-cy="blog-container"]')
          .eq(1)
          .should('contain', 'Cypress Test by Kamyu Tanaka')
        cy.get('[data-cy="blog-container"]')
          .eq(2)
          .should('contain', 'Dummy Blog by Fitzgerald Lane')
      })
    })
  })
})