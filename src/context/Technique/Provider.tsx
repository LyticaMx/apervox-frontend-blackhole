import { ReactElement, ReactNode, useMemo, useReducer } from 'react'
import { useActions } from './actions'

import { reducer, initialState, TechniqueContext } from './context'

interface Props {
  children: ReactNode
}
const TechniqueProvider = ({ children }: Props): ReactElement => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const actions = useActions(state, dispatch)

  const value = useMemo(
    () => Object.assign({}, state, { actions }),
    [state, actions]
  )

  return (
    <TechniqueContext.Provider value={value}>
      {children}
    </TechniqueContext.Provider>
  )
}

export { TechniqueProvider }
