import { createContext, Context } from 'react'
import { LoaderContextType } from 'types/loader'

const initialState: LoaderContextType = {
  show: false
}

export const LoaderContext: Context<LoaderContextType> =
  createContext(initialState)
