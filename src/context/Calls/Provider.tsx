import { ReactElement, useMemo, ReactNode, useReducer } from 'react'

import { CallsContext, initialState } from './context'
import { DashboardCallContextType } from 'types/call'
import { useActions } from './actions'
import { reducer } from './reducer'

interface Props {
  children: ReactNode
}

const CallsProvider = ({ children }: Props): ReactElement => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const actions = useActions(state, dispatch)

  const contextValue: DashboardCallContextType = useMemo(
    () => Object.assign({}, state, { actions }),
    [state, actions]
  )

  return (
    <CallsContext.Provider value={contextValue}>
      {children}
    </CallsContext.Provider>
  )
}

export { CallsProvider }
