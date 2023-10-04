describe('User Sign-up and Login', function () {
  beforeEach(function () {
    cy.intercept('POST', `${Cypress.env('backendUrl')}auth/login`).as('signup')
  })

  it('should redirect unauthenticated user to signin page', function () {
    cy.visit('/mi-cuenta')
    cy.location('pathname').should('equal', '/inicio-de-sesion')
    cy.visualSnapshot('Redirect to SignIn')
  })

  it('should redirect to the home page after login or restore password if first login', function () {
    cy.login('root', 'superpass')
    cy.location('pathname').should('be.oneOf', [
      '/mi-cuenta',
      '/restablecer-contraseña'
    ])
  })
})
