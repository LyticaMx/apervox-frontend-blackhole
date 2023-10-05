// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    /**
     * Custom command to make taking Percy snapshots with full name formed from the test title + suffix easier
     */
    visualSnapshot: (name?: string) => Chainable<any>
    /**
     * Logs-in user by using UI
     */
    login: (username: string, password: string) => void
  }
}
