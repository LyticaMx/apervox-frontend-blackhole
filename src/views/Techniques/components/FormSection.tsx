import { ReactElement, useState } from 'react'
import clsx from 'clsx'

import Typography from 'components/Typography'
import { Objective, Technique } from 'types/technique'

import Wrapper, { ContentType } from './Wrapper'
import CustomTabs from './CustomTabs'
import { objectiveInfoTabs, OBJECTIVE_INFO_TABS } from '../constants'
import EvidenceList from './EvidenceList'
import ObjectiveForms from './ObjectiveForms'

// TODO: replace this with context data
import { evidencesData } from '../mocks'
import GeneralDataForm from './ObjectiveForms/GeneralDataForm'
import { useHistory } from 'react-router-dom'
import { pathRoute } from 'router/routes'

interface Props {
  show: boolean
  objective: Objective
  technique: Technique
}

const evidenceTypes = ['audio', 'video', 'image', 'doc']

const FormSection = ({ show, objective, technique }: Props): ReactElement => {
  const [active, setActive] = useState(OBJECTIVE_INFO_TABS.EVIDENCE)

  const history = useHistory()

  if (!show) return <Wrapper expanded={show} contentType={ContentType.FORMS} />

  return (
    <Wrapper expanded={show} contentType={ContentType.FORMS}>
      <div
        id="technique-objetive-forms"
        className="rounded-lg shadow-md border border-gray-100 p-3 h-full"
      >
        <div>
          <Typography variant="title" style="bold">
            {technique.name}
          </Typography>

          <CustomTabs
            classNames={{ container: 'my-2' }}
            items={objectiveInfoTabs}
            onChange={(tabClicked) => {
              setActive(tabClicked as OBJECTIVE_INFO_TABS)
            }}
            active={active}
          />

          <div
            className={clsx(
              active !== OBJECTIVE_INFO_TABS.EVIDENCE && 'hidden'
            )}
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

          <div
            className={clsx(active !== OBJECTIVE_INFO_TABS.FORMS && 'hidden')}
          >
            {active === OBJECTIVE_INFO_TABS.FORMS && <ObjectiveForms />}
          </div>
        </div>
      </div>
    </Wrapper>
  )
}

export default FormSection
