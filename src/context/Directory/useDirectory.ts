import { useContext } from 'react'
import { DirectoryContextType } from 'types/directory'
import { DirectoryContext } from './context'

export const useDirectory = (): DirectoryContextType =>
  useContext(DirectoryContext)
