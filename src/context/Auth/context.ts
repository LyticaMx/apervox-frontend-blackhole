import { createContext, Context } from 'react'
import { Auth, AuthContextType } from 'types/auth'
import { getItem } from 'utils/persistentStorage'

export const initialState: Auth = {
  isLogguedIn: false,
  token: getItem('token'),
  rToken: getItem('rToken'),
  profile: {
    id: '',
    names: '',
    lastName: '',
    username: '',
    since: '',
    email: '',
    phone: '',
    position: '',
    groups: [],
    role: ''
  }
}

export const AuthContext: Context<AuthContextType> = createContext({
  auth: initialState
})
