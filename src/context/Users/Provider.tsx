import { ReactElement, ReactNode, useMemo, useReducer } from 'react'

import { useActions } from './actions'
import { initialState, reducer, UsersContext } from './context'

interface Props {
  children: ReactNode
}

const UsersProvider = ({ children }: Props): ReactElement => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const actions = useActions(state, dispatch)

  const value = useMemo(
    () => Object.assign({}, state, { actions }),
    [state, actions]
  )

  return <UsersContext.Provider value={value}>{children}</UsersContext.Provider>
}

export { UsersProvider }
