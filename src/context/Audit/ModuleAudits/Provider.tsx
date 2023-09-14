import { ReactElement, ReactNode, useMemo, useReducer } from 'react'
import { ModuleAuditsContext, initialState } from './context'
import { reducer } from './reducer'
import { useActions } from './actions'
import { ContextType } from './types'

interface Props {
  children: ReactNode
}

const ModuleAuditsProvider = (props: Props): ReactElement => {
  const { children } = props
  const [state, dispatch] = useReducer(reducer, initialState)
  const actions = useActions(state, dispatch)

  const contextValue = useMemo<ContextType>(
    () => Object.assign({}, state, { actions }),
    [state, actions]
  )

  return (
    <ModuleAuditsContext.Provider value={contextValue}>
      {children}
    </ModuleAuditsContext.Provider>
  )
}

export { ModuleAuditsProvider }
