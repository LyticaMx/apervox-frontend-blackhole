import { ReactElement, useState } from 'react'
import { useHistory } from 'react-router-dom'
import clsx from 'clsx'

import { pathRoute } from 'router/routes'
// import { useTechnique } from 'context/Technique'

import CustomTabs from './CustomTabs'
import { objectiveInfoTabs, OBJECTIVE_INFO_TABS } from '../constants'
import EvidenceList from './EvidenceList'
import ObjectiveForms from './ObjectiveForms'
import GeneralDataForm from './ObjectiveForms/GeneralDataForm'
import { evidencesData } from 'views/Techniques/mocks'

// TODO: replace this with context data

const evidenceTypes = ['audio', 'video', 'image', 'doc']

const FormSection = (): ReactElement => {
  const history = useHistory()
  // const { technique, objective } = useTechnique()
  const [active, setActive] = useState(OBJECTIVE_INFO_TABS.EVIDENCE)

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

        <div
          className={clsx(active !== OBJECTIVE_INFO_TABS.EVIDENCE && 'hidden')}
        >
          <EvidenceList
            data={evidencesData}
            onSelectItem={(evidence) =>
              history.push(pathRoute.evidence, {
                type: evidenceTypes[evidence.type]
              })
            }
          />
        </div>

        <div
          className={clsx(
            active !== OBJECTIVE_INFO_TABS.GENERAL_DATA && 'hidden'
          )}
        >
          <GeneralDataForm />
        </div>

        <div className={clsx(active !== OBJECTIVE_INFO_TABS.FORMS && 'hidden')}>
          {active === OBJECTIVE_INFO_TABS.FORMS && <ObjectiveForms />}
        </div>
      </div>
    </div>
  )
}

export default FormSection
