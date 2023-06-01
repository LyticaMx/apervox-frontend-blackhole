import { ReactElement, ReactNode, useMemo, useReducer } from 'react'
import { reducer } from './reducer'
import { TargetsContext, initialState } from './context'
import { useActions } from './actions'
import { ContextType } from 'types/target'

interface Props {
  children: ReactNode
}

const TargetsProvider = (props: Props): ReactElement => {
  const { children } = props
  const [state, dispatch] = useReducer(reducer, initialState)
  const actions = useActions(state, dispatch)

  const contextValue = useMemo<ContextType>(
    () => Object.assign({}, state, { actions }),
    [state, actions]
  )

  return (
    <TargetsContext.Provider value={contextValue}>
      {children}
    </TargetsContext.Provider>
  )
}

export { TargetsProvider }
