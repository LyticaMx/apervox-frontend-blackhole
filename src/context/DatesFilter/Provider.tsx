import { ReactElement, ReactNode, useMemo, useReducer } from 'react'
import { useActions } from './actions'

import { reducer, initialState, DatesFilterContext } from './context'

interface Props {
  children: ReactNode
}
const DatesFilterProvider = ({ children }: Props): ReactElement => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const actions = useActions(state, dispatch)

  const value = useMemo(() => Object.assign({}, state, { actions }), [
    state,
    actions
  ])

  return (
    <DatesFilterContext.Provider value={value}>
      {children}
    </DatesFilterContext.Provider>
  )
}

export { DatesFilterProvider }
