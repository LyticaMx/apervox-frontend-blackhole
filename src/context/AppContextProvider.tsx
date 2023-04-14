import { ReactNode } from 'react'

import { PinsProvider } from 'context/Pins'
import { AlertsProvider } from 'context/Alerts'
import { DatesFilterProvider } from 'context/DatesFilter'
import { WorkGroupsProvider } from 'context/WorkGroups'
import { TechniqueProvider } from './Technique'
import { TechniquesProvider } from './Techniques'

interface Props {
  children: ReactNode
}

export const AppContextProvider = (props: Props): any => {
  const providers = [
    DatesFilterProvider,
    PinsProvider,
    AlertsProvider,
    WorkGroupsProvider,
    TechniqueProvider,
    TechniquesProvider
  ]

  const CombinedProviders = providers.reduce(
    (AccumulatedComponents, CurrentComponent) => {
      return function Combined({ children }: Props): JSX.Element {
        return (
          <AccumulatedComponents>
            <CurrentComponent>{children}</CurrentComponent>
          </AccumulatedComponents>
        )
      }
    },
    ({ children }) => <>{children}</>
  )

  return <CombinedProviders>{props.children}</CombinedProviders>
}
