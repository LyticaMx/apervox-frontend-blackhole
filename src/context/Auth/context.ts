import { createContext, Context } from 'react'
import { Auth, AuthContextType } from 'types/auth'
import { getItem } from 'utils/persistentStorage'

export const initialState: Auth = {
  isLogguedIn: true,
  token: getItem('token'),
  rToken: getItem('rToken'),
  profile: {
    email: '',
    profile_id: '',
    name: '',
    fathers_name: '',
    mothers_name: '',
    since: '',
    activated: '',
    pic: ''
  }
}

export const AuthContext: Context<AuthContextType> = createContext({
  auth: initialState
})
