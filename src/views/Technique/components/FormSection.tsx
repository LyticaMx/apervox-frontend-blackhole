import { ReactElement, useEffect, useMemo } from 'react'
import { useHistory } from 'react-router-dom'
import { pathRoute } from 'router/routes'

import { useTechnique } from 'context/Technique'
import { useTabs } from 'hooks/useTabs'

import CustomTabs from './CustomTabs'
import { targetInfoTabs } from '../constants'
import EvidenceList from './EvidenceList'
import TargetForms from './TargetForms'
import GeneralDataForm from './TargetForms/GeneralDataForm'
import { TechniqueTabs } from 'types/technique'
import { useWorkingEvidence } from 'context/WorkingEvidence'
import { ACTION, SUBJECT, useAbility } from 'context/Ability'
import WrongPermissions from 'components/WrongPermissions'

const FormSection = (): ReactElement => {
  const history = useHistory()
  const { target, showTargetForms, activeTab, actions } = useTechnique()
  const [active, setActive, Tab] = useTabs(activeTab)
  const { actions: workingActions } = useWorkingEvidence()
  const ability = useAbility()

  useEffect(() => {
    setActive(activeTab)
  }, [activeTab])

  const tabs = useMemo(
    () =>
      targetInfoTabs.filter((item) => {
        if (item.id === TechniqueTabs.GENERAL_DATA) return Boolean(target)
        if (item.id === TechniqueTabs.FORMS) return showTargetForms
        return true
      }),
    [target, showTargetForms]
  )

  useEffect(() => {
    if (!target && active !== TechniqueTabs.EVIDENCE) {
      setActive(TechniqueTabs.EVIDENCE)
    }
  }, [active, target])

  return (
    <div id="technique-objetive-forms" className="h-full">
      <CustomTabs
        classNames={{ container: 'my-2' }}
        items={tabs}
        onChange={(tab) => {
          actions?.setActiveTab(tab as unknown as TechniqueTabs)
        }}
        active={active}
      />

      <Tab value={TechniqueTabs.EVIDENCE}>
        {ability.can(ACTION.READ, SUBJECT.CALL_EVIDENCES) ? (
          <EvidenceList
            onSelectItem={async (evidence) => {
              if (ability.cannot(ACTION.UPDATE, SUBJECT.CALL_EVIDENCES)) return
              workingActions?.setEvidence(evidence.id)

              history.push(pathRoute.evidence, {
                type: 'audio',
                from: 'technique'
              })
            }}
          />
        ) : (
          <WrongPermissions />
        )}
      </Tab>

      <Tab value={TechniqueTabs.GENERAL_DATA}>
        <GeneralDataForm />
      </Tab>

      <Tab value={TechniqueTabs.FORMS}>
        <TargetForms />
      </Tab>
    </div>
  )
}

export default FormSection
