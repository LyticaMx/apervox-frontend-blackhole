import { ReactNode } from 'react'

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
import { LocationProvider } from './Locations'
import { TargetsProvider } from './Targets'
import { MonitoringProvider } from './Monitoring'
import { CallHistoryProvider } from './CallHistory'
import { EvidencesProvider } from './Evidences'
import { WorkingEvidenceProvider } from './WorkingEvidence'
import {
  LoginAuditsProvider,
  ModuleAuditsProvider,
  SpecificModelAuditsProvider,
  SpecificUserAuditsProvider
} from './Audit'
import { EvidenceSocketProvider } from './EvidenceSocket'
import { LiveCallSocketProvider } from './LiveCallSocket'
import { LineHistoryProvider } from './LineHistory'
import { RTCPlayerProvider } from './RTCPlayer'

interface Props {
  children: ReactNode
}

export const AppContextProvider = (props: Props): any => {
  const providers = [
    RTCPlayerProvider,
    ModuleAuditsProvider,
    TargetsProvider,
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
    TechniquesProvider,
    LocationProvider,
    MonitoringProvider,
    CallHistoryProvider,
    EvidencesProvider,
    WorkingEvidenceProvider,
    EvidenceSocketProvider,
    SpecificUserAuditsProvider,
    SpecificModelAuditsProvider,
    LoginAuditsProvider,
    LiveCallSocketProvider,
    LineHistoryProvider
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
