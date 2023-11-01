import { ReactElement, ReactNode, useMemo, useReducer } from 'react'
import { LineHistoryContext, initialState } from './context'
import { reducer } from './reducer'
import { useActions } from './actions'
import { ContextType } from './types'

interface Props {
  children: ReactNode
}

const LineHistoryProvider = (props: Props): ReactElement => {
  const { children } = props
  const [state, dispatch] = useReducer(reducer, initialState)
  const actions = useActions(state, dispatch)

  const contextValue = useMemo<ContextType>(
    () => Object.assign({}, state, { actions }),
    [state, actions]
  )

  return (
    <LineHistoryContext.Provider value={contextValue}>
      {children}
    </LineHistoryContext.Provider>
  )
}

export { LineHistoryProvider }
