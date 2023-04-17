import { ReactElement, ReactNode, useMemo, useReducer } from 'react'
import { reducer } from './reducer'
import { UserContext, initialState } from './context'
import { useActions } from './actions'
import { UserContextType } from 'types/user'

interface Props {
  children: ReactNode
}

const UsersProvider = (props: Props): ReactElement => {
  const { children } = props
  const [state, dispatch] = useReducer(reducer, initialState)
  const actions = useActions(state, dispatch)

  const contextValue = useMemo<UserContextType>(
    () => Object.assign({}, state, { actions }),
    [state, actions]
  )

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  )
}

export { UsersProvider }
