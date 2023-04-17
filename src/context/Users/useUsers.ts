import { useContext } from 'react'
import { UserContext } from './context'
import { UserContextType } from 'types/user'

export const useUsers = (): UserContextType => useContext(UserContext)
