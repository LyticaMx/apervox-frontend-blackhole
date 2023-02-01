import { ReactElement, ReactNode, useMemo, useReducer } from 'react'
import { useActions } from './actions'

import { reducer, initialState, BondingNetworkContext } from './context'

interface Props {
  children: ReactNode
}
const BondingNetworkProvider = ({ children }: Props): ReactElement => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const actions = useActions(state, dispatch)

  const value = useMemo(() => Object.assign({}, state, { actions }), [
    state,
    actions
  ])

  return (
    <BondingNetworkContext.Provider value={value}>
      {children}
    </BondingNetworkContext.Provider>
  )
}

export { BondingNetworkProvider }
