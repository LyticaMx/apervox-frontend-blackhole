import { useContext } from 'react'
import { AuthContextType } from 'types/auth'
import { AuthContext } from './AuthContext'

export const useAuth = (): AuthContextType => useContext(AuthContext)
