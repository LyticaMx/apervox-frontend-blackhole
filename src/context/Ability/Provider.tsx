import { ReactElement, ReactNode } from 'react'
import { AbilityContext, initialAbility } from './context'

interface Props {
  children: ReactNode
}

const AbilityProvider = ({ children }: Props): ReactElement => (
  <AbilityContext.Provider value={initialAbility}>
    {children}
  </AbilityContext.Provider>
)

export { AbilityProvider }
