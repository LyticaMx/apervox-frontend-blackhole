import { ReactElement } from 'react'
import { useHistory } from 'react-router-dom'
import { pathRoute } from 'router/routes'

// import { useTechnique } from 'context/Technique'
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
  const [active, setActive, Tab] = useTabs(TARGET_INFO_TABS.EVIDENCE)
  // const { technique, target } = useTechnique()

  return (
    <div id="technique-objetive-forms" className="h-full">
      <CustomTabs
        classNames={{ container: 'my-2' }}
        items={targetInfoTabs}
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
