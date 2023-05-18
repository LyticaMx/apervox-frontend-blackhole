import { ReactElement, ReactNode, useMemo, useReducer } from 'react'
import { reducer } from './reducer'
import { AcquisitionMediumsContext, initialState } from './context'
import { useActions } from './actions'
import { ContextType } from './types'

interface Props {
  children: ReactNode
}

const AcquisitionMediumsProvider = (props: Props): ReactElement => {
  const { children } = props
  const [state, dispatch] = useReducer(reducer, initialState)
  const actions = useActions(state, dispatch)

  const contextValue = useMemo<ContextType>(
    () => Object.assign({}, state, { actions }),
    [state, actions]
  )

  return (
    <AcquisitionMediumsContext.Provider value={contextValue}>
      {children}
    </AcquisitionMediumsContext.Provider>
  )
}

export { AcquisitionMediumsProvider }
