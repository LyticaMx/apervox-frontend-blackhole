import { ReactElement } from 'react'
import { useHistory } from 'react-router-dom'

import { pathRoute } from 'router/routes'
// import { useTechnique } from 'context/Technique'

import CustomTabs from './CustomTabs'
import { objectiveInfoTabs, OBJECTIVE_INFO_TABS } from '../constants'
import EvidenceList from './EvidenceList'
import ObjectiveForms from './ObjectiveForms'
import GeneralDataForm from './ObjectiveForms/GeneralDataForm'
import { evidencesData } from 'views/Techniques/mocks'
import { useTabs } from 'hooks/useTabs'

const evidenceTypes = ['audio', 'video', 'image', 'doc']

const FormSection = (): ReactElement => {
  const history = useHistory()
  const [active, setActive, Tab] = useTabs(OBJECTIVE_INFO_TABS.EVIDENCE)
  // const { technique, objective } = useTechnique()

  return (
    <div id="technique-objetive-forms" className="h-full">
      <div>
        <CustomTabs
          classNames={{ container: 'my-2' }}
          items={objectiveInfoTabs}
          onChange={(tabClicked) => {
            setActive(tabClicked as OBJECTIVE_INFO_TABS)
          }}
          active={active}
        />

        <Tab value={OBJECTIVE_INFO_TABS.EVIDENCE}>
          <EvidenceList
            data={evidencesData}
            onSelectItem={(evidence) =>
              history.push(pathRoute.evidence, {
                type: evidenceTypes[evidence.type]
              })
            }
          />
        </Tab>

        <Tab value={OBJECTIVE_INFO_TABS.GENERAL_DATA}>
          <GeneralDataForm />
        </Tab>

        <Tab value={OBJECTIVE_INFO_TABS.FORMS}>
          <ObjectiveForms />
        </Tab>
      </div>
    </div>
  )
}

export default FormSection
