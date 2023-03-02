import { ReactElement, ReactNode, useMemo, useReducer } from 'react'

import { useActions } from './actions'
import { initialState, reducer, WorkGroupsContext } from './context'

interface Props {
  children: ReactNode
}

const WorkGroupsProvider = ({ children }: Props): ReactElement => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const actions = useActions(state, dispatch)

  const value = useMemo(
    () => Object.assign({}, state, { actions }),
    [state, actions]
  )

  return (
    <WorkGroupsContext.Provider value={value}>
      {children}
    </WorkGroupsContext.Provider>
  )
}

export { WorkGroupsProvider }
