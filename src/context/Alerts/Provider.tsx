import { ReactElement, ReactNode, useMemo, useReducer } from 'react'
import { AlertContextType } from 'types/alert'
import { useActions } from './actions'
import { AlertsContext, initialState } from './context'
import { reducer } from './reducer'

interface Props {
  children: ReactNode
}

const AlertsProvider = (props: Props): ReactElement => {
  const { children } = props
  const [state, dispatch] = useReducer(reducer, initialState)
  const actions = useActions(state, dispatch)

  const contextValue = useMemo<AlertContextType>(
    () => Object.assign({}, state, { actions }),
    [state, actions]
  )

  return (
    <AlertsContext.Provider value={contextValue}>
      {children}
    </AlertsContext.Provider>
  )
}

export { AlertsProvider }
