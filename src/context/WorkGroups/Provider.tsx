import { ReactElement, ReactNode, useMemo, useReducer } from 'react'

import { useActions } from './actions'
import { initialState, WorkGroupsContext } from './context'
import { reducer } from './reducer'

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
