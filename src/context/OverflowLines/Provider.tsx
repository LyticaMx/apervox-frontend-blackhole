import { ReactElement, ReactNode, useMemo, useReducer } from 'react'
import { reducer } from './reducer'
import { OverflowLineContext, initialState } from './context'
import { useActions } from './actions'
import { ContextType } from 'types/overflowLine'

interface Props {
  children: ReactNode
}

const OverflowLineProvider = (props: Props): ReactElement => {
  const { children } = props
  const [state, dispatch] = useReducer(reducer, initialState)
  const actions = useActions(state, dispatch)

  const contextValue = useMemo<ContextType>(
    () => Object.assign({}, state, { actions }),
    [state, actions]
  )

  return (
    <OverflowLineContext.Provider value={contextValue}>
      {children}
    </OverflowLineContext.Provider>
  )
}

export { OverflowLineProvider }
