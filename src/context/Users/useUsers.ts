import { useContext } from 'react'
import { ContextType } from 'types/user'
import { UsersContext } from './context'

export const useUsers = (): ContextType => useContext(UsersContext)
