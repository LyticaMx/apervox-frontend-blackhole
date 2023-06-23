import { ReactElement } from 'react'
import { useIntl } from 'react-intl'

import { useTabs } from 'hooks/useTabs'
import { useTechnique } from 'context/Technique'
import { actionsMessages } from 'globalMessages'

import Typography from 'components/Typography'
import Button from 'components/Button'

import TargetList from './TargetList'
import CustomTabs from './CustomTabs'
import { techiniqueInfoTabs, TECHNIQUE_INFO_TABS } from '../constants'
import TechniqueUpdateForm from './TechniqueUpdateForm'
import { techniqueInfoMessages } from '../messages'
import TechniqueSummary from './TechniqueSummary'

const TechniqueInfo = (): ReactElement => {
  const { targets, actions } = useTechnique()
  const [active, setActive, Tab] = useTabs(TECHNIQUE_INFO_TABS.TARGET)

  const { formatMessage } = useIntl()

  return (
    <div className="flex flex-col h-full">
      <CustomTabs
        classNames={{ container: 'mb-2' }}
        items={techiniqueInfoTabs}
        onChange={(tabClicked) => {
          setActive(tabClicked as TECHNIQUE_INFO_TABS)
        }}
        active={active}
      />

      <Tab className="flex-1 h-0" value={TECHNIQUE_INFO_TABS.TARGET}>
        <TargetList
          data={targets}
          onSelectItem={(item) => {
            actions?.setTarget(item)
          }}
        />
      </Tab>
      <Tab value={TECHNIQUE_INFO_TABS.DESCRIPTION}>
        <TechniqueSummary />
      </Tab>
      <Tab value={TECHNIQUE_INFO_TABS.CONFIG}>
        <Typography variant="body2" style="semibold" className="uppercase">
          {formatMessage(techniqueInfoMessages.configuration)}
        </Typography>
        <div className="flex items-center justify-between">
          <Typography variant="body2">
            {formatMessage(techniqueInfoMessages.techniqueData)}
          </Typography>
          <Button color="indigo">{formatMessage(actionsMessages.save)}</Button>
        </div>
        <TechniqueUpdateForm
          onSubmit={async (values) => console.log('values', values)}
        />
      </Tab>
    </div>
  )
}

export default TechniqueInfo
