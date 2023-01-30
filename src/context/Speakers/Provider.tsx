import { ReactElement, ReactNode, useMemo, useReducer } from 'react'
import { useActions } from './actions'

import { reducer, initialState, SpeakersContext } from './context'

interface Props {
  children: ReactNode
}
const SpeakersProvider = ({ children }: Props): ReactElement => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const actions = useActions(state, dispatch)

  const value = useMemo(() => Object.assign({}, state, { actions }), [
    state,
    actions
  ])

  return (
    <SpeakersContext.Provider value={value}>
      {children}
    </SpeakersContext.Provider>
  )
}

export { SpeakersProvider }
