import { ReactElement, ReactNode, useMemo, useReducer } from 'react'
import { useActions } from './actions'
import { initialState, DependenciesContext, reducer } from './context'

interface Props {
  children: ReactNode
}

const DependenciesProvider = ({ children }: Props): ReactElement => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const actions = useActions(state, dispatch)

  const value = useMemo(
    () => Object.assign({}, state, { actions }),
    [state, actions]
  )

  return (
    <DependenciesContext.Provider value={value}>
      {children}
    </DependenciesContext.Provider>
  )
}

export { DependenciesProvider }
