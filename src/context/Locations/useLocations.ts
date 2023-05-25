import { useContext } from 'react'
import { LocationContextType } from 'types/location'
import { LocationContext } from './context'

export const useLocations = (): LocationContextType =>
  useContext(LocationContext)
