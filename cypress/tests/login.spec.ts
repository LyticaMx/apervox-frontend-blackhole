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

  // TODO: Test sin terminar
  it('should display error in login', function () {
    cy.login('root', 'contraseña')
    cy.visualSnapshot('Wrong user or password')
  })

  it('should display errors in fields when empty', function () {
    const signinPath = '/inicio-de-sesion'
    cy.location('pathname', { log: false }).then((currentPath) => {
      if (currentPath !== signinPath) {
        cy.visit('signinPath')
      }
    })
    cy.get(".btn[type='submit']").click()
    cy.get('#helper-user').should('exist').and('have.text', 'Requerido')
    cy.get('#helper-password').should('exist').and('have.text', 'Requerido')

    cy.visualSnapshot('Field errors')
  })
})
