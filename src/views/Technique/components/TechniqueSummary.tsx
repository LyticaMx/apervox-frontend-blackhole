import Typography from 'components/Typography'
import { ReactElement, useEffect, useRef } from 'react'
import { useIntl } from 'react-intl'
import { techniqueInfoMessages } from '../messages'
import Button from 'components/Button'
import { Editor } from '@ghostramses/ckeditor5-blackhole-custom-build/build/ckeditor'
import { ArrowDownTrayIcon } from '@heroicons/react/24/outline'
import RichTextEditor from 'components/RichTextEditor'
import { useTechnique } from 'context/Technique'
import useToast from 'hooks/useToast'
import { ACTION, SUBJECT, useAbility } from 'context/Ability'

const TechniqueSummary = (): ReactElement => {
  const { formatMessage } = useIntl()
  const descriptionRef = useRef<Editor>(null)
  const { summary, technique, actions: techniqueActions } = useTechnique()
  const { launchToast } = useToast()
  const ability = useAbility()

  useEffect(() => {
    techniqueActions?.getDescription()
  }, [technique?.id ?? ''])

  useEffect(() => {
    descriptionRef.current?.setData(summary)
  }, [summary]) // TODO: Revisar que tan buena es esta opción cuando sean descripciones grandes

  const handleUpdateSummary = async (): Promise<void> => {
    const updated = await techniqueActions?.updateDescription(
      descriptionRef.current?.getData() ?? ''
    )
    if (updated) {
      launchToast({
        title: formatMessage(techniqueInfoMessages.updatedSummary),
        type: 'Success'
      })
    }
  }

  return (
    <>
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
        <Button
          className="h-max"
          variant="text"
          color="indigo"
          disabled={ability.cannot(ACTION.UPDATE, SUBJECT.TECHNIQUES)}
          onClick={handleUpdateSummary}
        >
          {formatMessage(techniqueInfoMessages.saveDescription)}
        </Button>
      </div>
      <div className="mt-2">
        <RichTextEditor
          initialData={summary}
          editorRef={descriptionRef}
          readOnly={ability.cannot(ACTION.UPDATE, SUBJECT.TECHNIQUES)}
          className="border mb-3"
          textAreaClassName="editor-demo"
        />
      </div>
    </>
  )
}

export default TechniqueSummary
