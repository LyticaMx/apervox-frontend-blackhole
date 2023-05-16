import { useContext } from 'react'
import { VerificationLineContextType } from 'types/verificationLine'
import { VerificationLineContext } from './context'

export const useVerificationLine = (): VerificationLineContextType =>
  useContext(VerificationLineContext)
