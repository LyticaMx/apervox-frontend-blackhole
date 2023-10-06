// @ts-check
// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference types="../global.d.ts" />

// Import Cypress Percy plugin command
import '@percy/cypress'

Cypress.Commands.add('visualSnapshot', (name) => {
  // @ts-expect-error
  let snapshotTitle = cy.state('runnable').fullTitle()
  if (name) {
    snapshotTitle = `${snapshotTitle}-maybeName`
  }
  cy.percySnapshot(snapshotTitle, {
    // @ts-expect-error
    widths: [cy.state('viewportWidth')],
    // @ts-expect-error
    minHeight: cy.state('viewportHeight')
  })
})

Cypress.Commands.add('login', (username, password) => {
  const signinPath = '/inicio-de-sesion'
  const log = Cypress.log({
    name: 'login',
    displayName: 'LOGIN',
    message: [`Authenticating | ${username}`],
    autoEnd: false
  })

  cy.intercept('POST', `${Cypress.env('backendUrl')}auth/login`).as('loginUser')

  cy.location('pathname', { log: false }).then((currentPath) => {
    if (currentPath !== signinPath) {
      cy.visit('signinPath')
    }
  })

  log.snapshot('before')

  cy.get('input#user').type(username)
  cy.get('input#password').type(password)

  cy.get(".btn[type='submit']").click()

  cy.wait('@loginUser').then((loginUser: any) => {
    try {
      log.set({
        consoleProps() {
          return {
            username,
            password,
            token:
              loginUser.response.statusCode !== 401 &&
              loginUser.response.body.token,
            refreshToken:
              loginUser.response.statusCode !== 401 &&
              loginUser.response.body.refresh_token
          }
        }
      })
    } catch (e) {
      console.error(e)
    }

    log.snapshot('after')
    log.end()
  })
})
