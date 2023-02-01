import { ReactNode } from 'react'

import { PinsProvider } from 'context/Pins'

import { CallsProvider } from 'context/Calls'
import { ControlGroupsProvider } from 'context/ControlGroups'
import { SpeakersProvider } from 'context/Speakers/Provider'
import { DirectoryProvider } from 'context/Directory'
import { UsersProvider } from 'context/Users'
import { DependenciesProvider } from 'context/Dependencies'
import { AlertsProvider } from 'context/Alerts'
import { CasesProvider } from 'context/Cases'
import { AuditProvider } from 'context/Audit'
import { BondingNetworkProvider } from 'context/BondingNetwork'
import { DatesFilterProvider } from 'context/DatesFilter'
import { CallDetailProvider } from 'context/CallDetail'

interface Props {
  children: ReactNode
}

export const AppContextProvider = (props: Props): any => {
  const providers = [
    DatesFilterProvider,
    PinsProvider,
    CallsProvider,
    SpeakersProvider,
    ControlGroupsProvider,
    DirectoryProvider,
    UsersProvider,
    DependenciesProvider,
    AlertsProvider,
    CasesProvider,
    AuditProvider,
    BondingNetworkProvider,
    CallDetailProvider
  ]

  const CombinedProviders = providers.reduce(
    (AccumulatedComponents, CurrentComponent) => {
      // eslint-disable-next-line @typescript-eslint/space-before-function-paren
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
