import { ReactNode } from 'react'

import { PinsProvider } from 'context/Pins'
import { AlertsProvider } from 'context/Alerts'
import { DatesFilterProvider } from 'context/DatesFilter'
import { WorkGroupsProvider } from 'context/WorkGroups'
import { TechniqueProvider } from './Technique'
import { TechniquesProvider } from './Techniques'
import { UsersProvider } from 'context/Users'
import { RolesProvider } from './Roles'
import { CarriersProvider } from './Carriers'
import { DevicesProvider } from './Devices'
import { AcquisitionMediumsProvider } from './AcquisitionMediums'
import { LetterheadsProvider } from './Letterheads'
import { OverflowLineProvider } from './OverflowLines'
import { VerificationLineProvider } from './VerificationLines'
import { LabelsProvider } from './Labels'
import { SettingsProvider } from './Settings'

interface Props {
  children: ReactNode
}

export const AppContextProvider = (props: Props): any => {
  const providers = [
    DatesFilterProvider,
    PinsProvider,
    AlertsProvider,
    /* Contextos de BH2 */
    SettingsProvider,
    UsersProvider,
    RolesProvider,
    CarriersProvider,
    AcquisitionMediumsProvider,
    DevicesProvider,
    LabelsProvider,
    LetterheadsProvider,
    WorkGroupsProvider,
    RolesProvider,
    OverflowLineProvider,
    VerificationLineProvider,
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
