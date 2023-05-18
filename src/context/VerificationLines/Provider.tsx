import { ReactElement, ReactNode, useMemo, useReducer } from 'react'
import { useActions } from './actions'
import { VerificationLineContextType } from 'types/verificationLine'
import { VerificationLineContext, initialState } from './context'
import { reducer } from './reducer'

interface Props {
  children: ReactNode
}

const VerificationLineProvider = (props: Props): ReactElement => {
  const { children } = props
  const [state, dispatch] = useReducer(reducer, initialState)
  const actions = useActions(state, dispatch)

  const contextValue = useMemo<VerificationLineContextType>(
    () => Object.assign({}, state, { actions }),
    [state, actions]
  )

  return (
    <VerificationLineContext.Provider value={contextValue}>
      {children}
    </VerificationLineContext.Provider>
  )
}

export { VerificationLineProvider }
