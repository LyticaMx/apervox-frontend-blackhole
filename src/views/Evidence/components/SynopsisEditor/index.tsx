import { ArrowDownTrayIcon } from '@heroicons/react/24/outline'
import Button from 'components/Button'
import RichTextEditor from 'components/RichTextEditor'
import Typography from 'components/Typography'
import { MutableRefObject, ReactElement } from 'react'
import { useIntl } from 'react-intl'
import { DecoupledEditor } from 'types/richTextEditor'
import { eventHistoryMessages } from 'views/Evidence/messages'

import './styles.css'

interface Props {
  initialData: string
  editorRef: MutableRefObject<DecoupledEditor | null>
  readonly?: boolean
}

const SynopsisEditor = (props: Props): ReactElement => {
  const { initialData, editorRef } = props
  const { formatMessage } = useIntl()

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
          <button className="text-secondary-gray hover:enabled:text-secondary border shadow-md p-2 rounded-md">
            <ArrowDownTrayIcon className="w-5 h-5" />
          </button>
          <Button color="primary" variant="contained">
            {formatMessage(eventHistoryMessages.saveSynopsis)}
          </Button>
        </div>
      </div>
      <RichTextEditor
        initialData={initialData}
        editorRef={editorRef}
        className="border mb-3"
        textAreaClassName="synopsis-editor"
      />
    </div>
  )
}

export default SynopsisEditor
