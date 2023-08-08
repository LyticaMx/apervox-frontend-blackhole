import { ReactElement, ReactNode, useMemo, useReducer } from 'react'
import { EvidencesContext, initialState } from './context'
import { reducer } from './reducer'
import { useActions } from './actions'
import { ContextType } from './types'

interface Props {
  children: ReactNode
}

const EvidencesProvider = (props: Props): ReactElement => {
  const { children } = props
  const [state, dispatch] = useReducer(reducer, initialState)
  const actions = useActions(state, dispatch)

  const contextValue = useMemo<ContextType>(
    () => Object.assign({}, state, { actions }),
    [state, actions]
  )

  return (
    <EvidencesContext.Provider value={contextValue}>
      {children}
    </EvidencesContext.Provider>
  )
}

export { EvidencesProvider }
