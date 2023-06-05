import { useContext } from 'react'
import { ContextType } from 'types/verificationLine'
import { VerificationLineContext } from './context'

export const useVerificationLine = (): ContextType =>
  useContext(VerificationLineContext)
