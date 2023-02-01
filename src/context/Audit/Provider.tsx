import { ReactElement, ReactNode, useMemo, useReducer } from 'react'
import { AuditContextType } from 'types/audit'
import { useActions } from './actions'
import { AuditContext, initialState } from './context'
import { reducer } from './reducer'

interface Props {
  children: ReactNode
}

const AuditProvider = (props: Props): ReactElement => {
  const { children } = props
  const [state, dispatch] = useReducer(reducer, initialState)
  const actions = useActions(state, dispatch)

  const contextValue = useMemo<AuditContextType>(
    () => Object.assign({}, state, { actions }),
    [state, actions]
  )

  return (
    <AuditContext.Provider value={contextValue}>
      {children}
    </AuditContext.Provider>
  )
}

export { AuditProvider }
