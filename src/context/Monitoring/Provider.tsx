import { ReactElement, ReactNode, useMemo, useReducer } from 'react'
import { reducer } from './reducer'
import { MonitoringContext, initialState } from './context'
import { useActions } from './actions'
import { ContextType } from './types'

interface Props {
  children: ReactNode
}

const MonitoringProvider = (props: Props): ReactElement => {
  const { children } = props
  const [state, dispatch] = useReducer(reducer, initialState)
  const actions = useActions(state, dispatch)

  const contextValue = useMemo<ContextType>(
    () => Object.assign({}, state, { actions }),
    [state, actions]
  )

  return (
    <MonitoringContext.Provider value={contextValue}>
      {children}
    </MonitoringContext.Provider>
  )
}

export { MonitoringProvider }
