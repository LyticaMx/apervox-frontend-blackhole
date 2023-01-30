import { ReactElement, useMemo, ReactNode, useReducer } from 'react'

import { DirectoryContextType } from 'types/directory'

import { initialState, DirectoryContext } from './context'
import { useActions } from './actions'
import { reducer } from './reducer'

interface Props {
  children: ReactNode
}

const DirectoryProvider = ({ children }: Props): ReactElement => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const actions = useActions(state, dispatch)

  const contextValue: DirectoryContextType = useMemo(
    () => Object.assign({}, state, { actions }),
    [state, actions]
  )

  return (
    <DirectoryContext.Provider value={contextValue}>
      {children}
    </DirectoryContext.Provider>
  )
}

export { DirectoryProvider }
