import { ReactElement, ReactNode, useMemo, useReducer } from 'react'
import { useActions } from './actions'

import { reducer, initialState, TechniquesContext } from './context'

interface Props {
  children: ReactNode
}
const TechniquesProvider = ({ children }: Props): ReactElement => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const actions = useActions(state, dispatch)

  const value = useMemo(
    () => Object.assign({}, state, { actions }),
    [state, actions]
  )

  return (
    <TechniquesContext.Provider value={value}>
      {children}
    </TechniquesContext.Provider>
  )
}

export { TechniquesProvider }