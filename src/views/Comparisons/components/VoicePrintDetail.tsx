import { TrashIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import Typography from 'components/Typography'
import { generalMessages } from 'globalMessages'
import { ReactElement } from 'react'
import { useIntl } from 'react-intl'
import { voiceprintDetailMessages } from '../messages'

interface VoicePrint {
  id: string
  name: string
  receiver?: string
  totalAudios?: number
  date: string
}

interface Props {
  voicePrint: VoicePrint | null
  align?: 'left' | 'right'
  onDelete: () => void
}

const alignments = {
  left: {
    text: 'text-right',
    deleteButton: 'text-left'
  },
  right: {
    text: 'text-left',
    deleteButton: 'text-right'
  }
}

const VoicePrintDetail = (props: Props): ReactElement => {
  const { voicePrint, align = 'left', onDelete } = props
  const { formatMessage } = useIntl()

  return (
    <div>
      <div className={clsx(alignments[align].deleteButton)}>
        <button onClick={onDelete}>
          <TrashIcon className="w-4 h-4 text-red-500" />
        </button>
      </div>
      <div className="flex justify-center items-center h-32 ">
        {!voicePrint ? (
          <Typography style="normal" variant="body2" className="text-gray-400">
            {formatMessage(voiceprintDetailMessages.selectVoiceprint)}
          </Typography>
        ) : (
          <div className={clsx(alignments[align].text)}>
            <Typography variant="body2" style="bold">
              {voicePrint.name}
            </Typography>
            <Typography
              variant="caption"
              style="semibold"
              className="text-gray-400 mt-3"
            >
              {voicePrint.receiver !== undefined &&
                `${formatMessage(generalMessages.receiver)}: ${
                  voicePrint.receiver
                }`}
              {voicePrint.totalAudios !== undefined &&
                formatMessage(voiceprintDetailMessages.totalAssociatedAudio, {
                  total: voicePrint.totalAudios
                })}
            </Typography>
            <Typography
              variant="caption"
              style="semibold"
              className="text-gray-400 mt-3"
            >
              {voicePrint.receiver !== undefined &&
                formatMessage(generalMessages.doneOn, {
                  date: voicePrint.date
                })}
              {voicePrint.totalAudios !== undefined &&
                formatMessage(generalMessages.createdOn, {
                  date: voicePrint.date
                })}
            </Typography>
          </div>
        )}
      </div>
    </div>
  )
}

export default VoicePrintDetail
