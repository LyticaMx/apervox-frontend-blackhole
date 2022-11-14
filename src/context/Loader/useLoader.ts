import { useContext } from 'react'
import { LoaderContextType } from 'types/loader'
import { LoaderContext } from './LoaderContext'

export const useLoader = (): LoaderContextType => useContext(LoaderContext)
