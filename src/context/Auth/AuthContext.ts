import { createContext, Context } from 'react'
import { Auth, AuthContextType } from 'types/auth'

export const initialState: Auth = {
  isLogguedIn: true,
  token: '',
  user: {
    id: 0,
    name: 'Carlos Albor',
    email: 'carlos@albor.com',
    role: {
      id: 0,
      name: 'perfil',
      description: 'perfil'
    }
  }
}

export const AuthContext: Context<AuthContextType> = createContext({
  auth: initialState
})
