import { ReactElement, ReactNode, useMemo, useReducer } from 'react'
import { reducer } from './Reducer'
import { ModelAuditContext, initialState } from './context'
import { useActions } from './actions'
import { ContextType } from './types'

interface Props {
  children: ReactNode
}

const SpecificModelAuditsProvider = (props: Props): ReactElement => {
  const { children } = props
  const [state, dispatch] = useReducer(reducer, initialState)
  const actions = useActions(state, dispatch)

  const contextValue = useMemo<ContextType>(
    () => Object.assign({}, state, { actions }),
    [state, actions]
  )

  return (
    <ModelAuditContext.Provider value={contextValue}>
      {children}
    </ModelAuditContext.Provider>
  )
}

export { SpecificModelAuditsProvider }
