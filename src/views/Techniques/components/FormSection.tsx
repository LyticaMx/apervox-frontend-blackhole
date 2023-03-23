import { ReactElement, useState } from 'react'
import clsx from 'clsx'

import Typography from 'components/Typography'
import { Objective, Technique } from 'types/technique'

import Wrapper, { ContentType } from './Wrapper'
import CustomTabs from './CustomTabs'
import { EVIDENCE_TAB, objectiveInfoTabs } from '../constants'
import EvidenceList from './EvidenceList'

// TODO: replace this with context data
import { evidencesData } from '../mocks'

interface Props {
  show: boolean
  objective: Objective
  technique: Technique
}

const FormSection = ({ show, objective, technique }: Props): ReactElement => {
  const [active, setActive] = useState(EVIDENCE_TAB)

  if (!show) return <Wrapper expanded={show} contentType={ContentType.FORMS} />

  return (
    <Wrapper expanded={show} contentType={ContentType.FORMS}>
      <div className="rounded-lg shadow-md border border-gray-100 p-3 h-full">
        <div>
          <Typography variant="title" style="bold">
            {technique.name}
          </Typography>
          <CustomTabs
            classNames={{ container: 'my-2' }}
            items={objectiveInfoTabs}
            onChange={(tabClicked) => {
              setActive(tabClicked)
            }}
            active={active}
          />
          <div className={clsx(active !== EVIDENCE_TAB && 'hidden')}>
            <EvidenceList data={evidencesData} />
          </div>
        </div>
      </div>
    </Wrapper>
  )
}

export default FormSection
