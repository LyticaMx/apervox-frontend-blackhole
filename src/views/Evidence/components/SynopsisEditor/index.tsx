import { Editor } from '@ghostramses/ckeditor5-blackhole-custom-build/build/ckeditor'
// import { ArrowDownTrayIcon } from '@heroicons/react/24/outline'
import Button from 'components/Button'
import RichTextEditor from 'components/RichTextEditor'
import Typography from 'components/Typography'
import { MutableRefObject, ReactElement, useEffect } from 'react'
import { useIntl } from 'react-intl'
import { eventHistoryMessages } from 'views/Evidence/messages'

import './styles.css'
import { useWorkingEvidence } from 'context/WorkingEvidence'

interface Props {
  editorRef: MutableRefObject<Editor | null>
  readonly?: boolean
  saveSynopsis: () => Promise<void>
}

const SynopsisEditor = (props: Props): ReactElement => {
  const { editorRef, saveSynopsis } = props
  const { formatMessage } = useIntl()
  const { synopsis } = useWorkingEvidence()

  useEffect(() => {
    if (!editorRef.current) return
    editorRef.current?.setData(synopsis)
  }, [synopsis])

  return (
    <div>
      <Typography
        variant="subtitle"
        className="uppercase text-secondary"
        style="bold"
      >
        {formatMessage(eventHistoryMessages.evidenceSynopsis)}
      </Typography>
      <div className="flex justify-between items-center mb-4">
        <Typography>
          {formatMessage(eventHistoryMessages.evidenceSynopsisDescription)}
        </Typography>
        <div className="flex gap-2 items-center">
          {/* Comentado temporalmente
            <button className="text-secondary-gray hover:enabled:text-secondary border shadow-md p-2 rounded-md">
              <ArrowDownTrayIcon className="w-5 h-5" />
            </button>
          */}
          <Button color="primary" variant="contained" onClick={saveSynopsis}>
            {formatMessage(eventHistoryMessages.saveSynopsis)}
          </Button>
        </div>
      </div>
      <RichTextEditor
        initialData={synopsis}
        editorRef={editorRef}
        className="border mb-3"
        textAreaClassName="synopsis-editor"
      />
    </div>
  )
}

export default SynopsisEditor
