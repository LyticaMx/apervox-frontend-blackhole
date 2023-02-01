import { useContext } from 'react'
import { ContextType } from 'types/bondingNetwork'
import { BondingNetworkContext } from './context'

export const useBondingNetwork = (): ContextType =>
  useContext(BondingNetworkContext)
