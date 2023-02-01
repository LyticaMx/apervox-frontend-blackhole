import { ReactElement, useMemo, ReactNode, useReducer } from 'react'

import { CallDetailContext, initialState } from './context'
import { CallDetailContextType } from 'types/call'
import { useActions } from './actions'
import { reducer } from './reducer'

interface Props {
  children: ReactNode
}

const CallDetailProvider = ({ children }: Props): ReactElement => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const actions = useActions(state, dispatch)

  const contextValue: CallDetailContextType = useMemo(
    () => Object.assign({}, state, { actions }),
    [state, actions]
  )

  return (
    <CallDetailContext.Provider value={contextValue}>
      {children}
    </CallDetailContext.Provider>
  )
}

export { CallDetailProvider }
