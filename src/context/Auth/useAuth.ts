import { useContext } from 'react'
import { AuthContextType } from 'types/auth'
import { AuthContext } from './context'

export const useAuth = (): AuthContextType => useContext(AuthContext)
