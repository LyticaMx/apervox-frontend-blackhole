import { ReactElement, ReactNode, useMemo, useReducer } from 'react'
import { CaseContextType } from 'types/case'
import { useActions } from './actions'
import { CasesContext, initialState } from './context'
import { reducer } from './reducer'

interface Props {
  children: ReactNode
}

const CasesProvider = (props: Props): ReactElement => {
  const { children } = props
  const [state, dispatch] = useReducer(reducer, initialState)
  const actions = useActions(state, dispatch)

  const contextValue = useMemo<CaseContextType>(
    () => Object.assign({}, state, { actions }),
    [state, actions]
  )

  return (
    <CasesContext.Provider value={contextValue}>
      {children}
    </CasesContext.Provider>
  )
}

export { CasesProvider }
