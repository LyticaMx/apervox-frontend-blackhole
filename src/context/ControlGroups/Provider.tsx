import { ReactElement, ReactNode, useMemo, useReducer } from 'react'
import { useActions } from './actions'

import { reducer, initialState, ControlGroupsContext } from './context'

interface Props {
  children: ReactNode
}
const ControlGroupsProvider = ({ children }: Props): ReactElement => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const actions = useActions(state, dispatch)

  const value = useMemo(() => Object.assign({}, state, { actions }), [
    state,
    actions
  ])

  return (
    <ControlGroupsContext.Provider value={value}>
      {children}
    </ControlGroupsContext.Provider>
  )
}

export { ControlGroupsProvider }
