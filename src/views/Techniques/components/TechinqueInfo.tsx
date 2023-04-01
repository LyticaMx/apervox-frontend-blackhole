import { ReactElement, useState, useRef } from 'react'
import clsx from 'clsx'

import { Editor } from '@ghostramses/ckeditor5-blackhole-custom-build/build/ckeditor'

import Typography from 'components/Typography'
import RichTextEditor from 'components/RichTextEditor'
import { Objective, Technique } from 'types/technique'

import ObjectiveList from './ObjectiveList'
import Wrapper, { ContentType } from './Wrapper'
import CustomTabs from './CustomTabs'
import { techiniqueInfoTabs, TECHNIQUE_INFO_TABS } from '../constants'
import Button from 'components/Button'
import { ArrowDownTrayIcon } from '@heroicons/react/24/outline'
import TechniqueUpdateForm from './TechniqueUpdateForm'

interface Props {
  show: boolean
  onSelectItem: (item: Objective) => void
  objectiveList: Objective[]
  technique: Technique
}

const TechniqueInfo = ({
  show,
  objectiveList,
  technique,
  onSelectItem
}: Props): ReactElement => {
  const descriptionRef = useRef<Editor>(null)

  const [active, setActive] = useState(TECHNIQUE_INFO_TABS.OBJECTIVE)

  if (!technique) {
    return <Wrapper expanded={show} contentType={ContentType.TECHNIQUE_INFO} />
  }

  return (
    <Wrapper expanded={show} contentType={ContentType.TECHNIQUE_INFO}>
      <div className="rounded-lg shadow-md p-3 h-full">
        <Typography variant="title" style="bold">
          {technique.name}
        </Typography>
        <CustomTabs
          classNames={{ container: 'my-2' }}
          items={techiniqueInfoTabs}
          onChange={(tabClicked) => {
            setActive(tabClicked as TECHNIQUE_INFO_TABS)
          }}
          active={active}
        />
        <div
          className={clsx(active !== TECHNIQUE_INFO_TABS.OBJECTIVE && 'hidden')}
        >
          <ObjectiveList data={objectiveList} onSelectItem={onSelectItem} />
        </div>
        <div
          className={clsx(
            active !== TECHNIQUE_INFO_TABS.DESCRIPTION && 'hidden'
          )}
        >
          <Typography variant="body2" style="semibold">
            DESCRIPCIÓN DE LA TÉCNICA
          </Typography>
          <div className="flex justify-between">
            <Typography variant="body2">
              Espacio que indica de que trata la técnica en curso.
            </Typography>
            <div className="flex ml-1">
              <Button
                className="h-max !bg-transparent !px-1 shadow-md mr-2"
                variant="contained"
                onClick={() => alert(descriptionRef.current?.getData())}
              >
                <ArrowDownTrayIcon className="h-6 text-slate-400" />
              </Button>
              <Button className="h-max" variant="contained" color="indigo">
                Guardar descripción
              </Button>
            </div>
          </div>
          <div className="mt-2">
            <RichTextEditor
              initialData="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque suscipit mi ac nisl congue, sed vestibulum sem varius. Aliquam dapibus quis lacus eu vehicula. Quisque efficitur libero vitae sodales dictum. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Integer consequat, orci finibus scelerisque suscipit, magna urna pulvinar lacus, eu lacinia neque enim non tellus. Integer accumsan, ipsum eu sollicitudin gravida, felis purus dapibus erat, et luctus nisi ligula egestas mauris. Nam sed sagittis purus. Sed tempus in leo eu bibendum. Donec venenatis, ex quis congue posuere, felis arcu pharetra odio, in porta leo ligula vel nisl. Nulla ac est enim. Etiam at augue vel nisi placerat blandit."
              editorRef={descriptionRef}
              className="border mb-3"
              textAreaClassName="editor-demo"
            />
          </div>
        </div>
        <div
          className={clsx(active !== TECHNIQUE_INFO_TABS.CONFIG && 'hidden')}
        >
          <Typography variant="body2" style="semibold">
            CONFIGURACIÓN DE LA TÉCNICA
          </Typography>
          <div className="flex items-center justify-between">
            <Typography variant="body2">Datos de la técnica.</Typography>
            <Button color="indigo">Guardar</Button>
          </div>
          <TechniqueUpdateForm
            onSubmit={async (values) => console.log('values', values)}
          />
        </div>
      </div>
    </Wrapper>
  )
}

export default TechniqueInfo
