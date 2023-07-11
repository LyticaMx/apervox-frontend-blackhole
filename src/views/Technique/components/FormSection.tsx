import { ReactElement, useEffect, useMemo } from 'react'
import { useHistory } from 'react-router-dom'
import { pathRoute } from 'router/routes'

import { useTechnique } from 'context/Technique'
import { useTabs } from 'hooks/useTabs'

import CustomTabs from './CustomTabs'
import { targetInfoTabs, TARGET_INFO_TABS } from '../constants'
import EvidenceList from './EvidenceList'
import TargetForms from './TargetForms'
import GeneralDataForm from './TargetForms/GeneralDataForm'
import { evidencesData } from 'views/Techniques/mocks'

const evidenceTypes = ['audio', 'video', 'image', 'doc']

const FormSection = (): ReactElement => {
  const history = useHistory()
  const { target } = useTechnique()
  const [active, setActive, Tab] = useTabs(TARGET_INFO_TABS.EVIDENCE)
  const tabs = useMemo(
    () =>
      targetInfoTabs.filter((item) => {
        if (!item.target) return true
        else return Boolean(target)
      }),
    [target]
  )

  useEffect(() => {
    if (!target && active !== TARGET_INFO_TABS.EVIDENCE) {
      setActive(TARGET_INFO_TABS.EVIDENCE)
    }
  }, [active, target])

  return (
    <div id="technique-objetive-forms" className="h-full">
      <CustomTabs
        classNames={{ container: 'my-2' }}
        items={tabs}
        onChange={(tabClicked) => {
          setActive(tabClicked as TARGET_INFO_TABS)
        }}
        active={active}
      />

      <Tab value={TARGET_INFO_TABS.EVIDENCE}>
        <EvidenceList
          data={evidencesData}
          onSelectItem={(evidence) =>
            history.push(pathRoute.evidence, {
              type: evidenceTypes[evidence.type]
            })
          }
        />
      </Tab>

      <Tab value={TARGET_INFO_TABS.GENERAL_DATA}>
        <GeneralDataForm />
      </Tab>

      <Tab value={TARGET_INFO_TABS.FORMS}>
        <TargetForms />
      </Tab>
    </div>
  )
}

export default FormSection
