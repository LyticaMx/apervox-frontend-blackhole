import { createContext, Context } from 'react'
import { Auth, AuthContextType } from 'types/auth'
import { getItem } from 'utils/persistentStorage'

export const initialState: Auth = {
  isLogguedIn: true,
  token: getItem('token'),
  rToken: getItem('rToken'),
  profile: getItem('profile')
}

export const AuthContext: Context<AuthContextType> = createContext({
  auth: initialState
})
