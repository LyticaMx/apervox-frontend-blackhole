import { ReactElement, useRef } from 'react'

import { Editor } from '@ghostramses/ckeditor5-blackhole-custom-build/build/ckeditor'

import Typography from 'components/Typography'
import RichTextEditor from 'components/RichTextEditor'

import ObjectiveList from './ObjectiveList'
import CustomTabs from './CustomTabs'
import { techiniqueInfoTabs, TECHNIQUE_INFO_TABS } from '../constants'
import Button from 'components/Button'
import { ArrowDownTrayIcon } from '@heroicons/react/24/outline'
import TechniqueUpdateForm from './TechniqueUpdateForm'
import { useIntl } from 'react-intl'
import { techniqueInfoMessages } from '../messages'
import { actionsMessages } from 'globalMessages'
import { useTabs } from 'hooks/useTabs'
import { useTechnique } from 'context/Technique'

const TechniqueInfo = (): ReactElement => {
  const { targets, actions } = useTechnique()
  const descriptionRef = useRef<Editor>(null)
  const [active, setActive, Tab] = useTabs(TECHNIQUE_INFO_TABS.OBJECTIVE)

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

      <Tab className="flex-1 h-0" value={TECHNIQUE_INFO_TABS.OBJECTIVE}>
        <ObjectiveList
          data={targets}
          onSelectItem={(item) => {
            actions?.setTarget(item)
          }}
        />
      </Tab>
      <Tab value={TECHNIQUE_INFO_TABS.DESCRIPTION}>
        <Typography variant="body2" style="semibold" className="uppercase">
          {formatMessage(techniqueInfoMessages.title)}
        </Typography>
        <Typography variant="body2">
          {formatMessage(techniqueInfoMessages.subtitle)}
        </Typography>
        <div className="flex justify-end">
          <Button
            className="h-max !bg-transparent !px-1 shadow-md mr-2"
            variant="contained"
            onClick={() => alert(descriptionRef.current?.getData())}
          >
            <ArrowDownTrayIcon className="h-6 text-slate-400" />
          </Button>
          <Button className="h-max" variant="text" color="indigo">
            {formatMessage(techniqueInfoMessages.saveDescription)}
          </Button>
        </div>
        <div className="mt-2">
          <RichTextEditor
            initialData="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque suscipit mi ac nisl congue, sed vestibulum sem varius. Aliquam dapibus quis lacus eu vehicula. Quisque efficitur libero vitae sodales dictum. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Integer consequat, orci finibus scelerisque suscipit, magna urna pulvinar lacus, eu lacinia neque enim non tellus. Integer accumsan, ipsum eu sollicitudin gravida, felis purus dapibus erat, et luctus nisi ligula egestas mauris. Nam sed sagittis purus. Sed tempus in leo eu bibendum. Donec venenatis, ex quis congue posuere, felis arcu pharetra odio, in porta leo ligula vel nisl. Nulla ac est enim. Etiam at augue vel nisi placerat blandit."
            editorRef={descriptionRef}
            className="border mb-3"
            textAreaClassName="editor-demo"
          />
        </div>
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
