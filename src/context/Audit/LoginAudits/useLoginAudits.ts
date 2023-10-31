import { useContext } from 'react'
import { LoginAuditsContext } from './context'
import { ContextType } from './types'

export const useLoginAudits = (): ContextType => useContext(LoginAuditsContext)
