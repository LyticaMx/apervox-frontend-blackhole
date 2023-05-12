import { useContext } from 'react'
import { CarriersContext } from './context'
import { ContextType } from './types'

export const useCarriers = (): ContextType => useContext(CarriersContext)
