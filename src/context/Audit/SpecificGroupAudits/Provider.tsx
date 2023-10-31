import { ReactElement, ReactNode, useMemo, useReducer } from 'react'
import { reducer } from './Reducer'
import { GroupAuditContext, initialState } from './context'
import { useActions } from './actions'
import { ContextType } from './types'

interface Props {
  children: ReactNode
}

const SpecificGroupAuditsProvider = (props: Props): ReactElement => {
  const { children } = props
  const [state, dispatch] = useReducer(reducer, initialState)
  const actions = useActions(state, dispatch)

  const contextValue = useMemo<ContextType>(
    () => Object.assign({}, state, { actions }),
    [state, actions]
  )

  return (
    <GroupAuditContext.Provider value={contextValue}>
      {children}
    </GroupAuditContext.Provider>
  )
}

export { SpecificGroupAuditsProvider }
