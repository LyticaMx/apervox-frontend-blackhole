import { defineConfig } from 'cypress'
import dotenv from 'dotenv'

dotenv.config()

export default defineConfig({
  projectId: 'Apervox-Blackhole',
  retries: {
    runMode: 2
  },
  env: {
    backendUrl: process.env.REACT_APP_MAIN_BACKEND_URL,
    xApiKey: process.env.REACT_APP_X_API_KEY
  },
  e2e: {
    baseUrl: 'http://localhost:3000',
    specPattern: 'cypress/tests/**/*.spec.{ts,tsx}',
    supportFile: 'cypress/support/e2e.ts',
    viewportHeight: 1080,
    viewportWidth: 1920,
    experimentalRunAllSpecs: true,
    setupNodeEvents(on, config) {
      // implement node event listeners here

      return config
    }
  }
})
