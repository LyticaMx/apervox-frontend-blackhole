import { CalendarDaysIcon, PhoneIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import Typography from 'components/Typography'
import { ReactElement } from 'react'
import { useIntl } from 'react-intl'
import { multipleVoicePrintSourceMessages } from 'views/Comparisons/messages'
import { AudioWaveIcon } from 'assets/SVG'

type VoiceprintType = 'TRANSMITTED_AUDIO' | 'CONTROL_GROUPS' | 'RECEIVED_AUDIO'

interface Props {
  name: string
  type: VoiceprintType
  receiver?: string
  totalAudios?: number
  date: string
  checked: boolean
  onClick: () => void
}

const VoiceprintData = (props: Props): ReactElement => {
  const { type, name, receiver, date, totalAudios, checked, onClick } = props
  const { formatMessage } = useIntl()

  const dividerColor = {
    TRANSMITTED_AUDIO: 'border-l-teal-400',
    RECEIVED_AUDIO: 'border-l-violet-500',
    CONTROL_GROUPS: 'border-l-violet-500'
  }

  return (
    <div className="p-2">
      <div className="flex items-center bg-slate-50">
        <div className="flex align-center justify-center px-2">
          <input
            type="checkbox"
            className="rounded"
            checked={checked}
            onChange={onClick}
          />
        </div>
        <div
          className={clsx(
            'border-l-2 pl-2 pr-1 py-2 flex-1',
            dividerColor[type]
          )}
        >
          <Typography variant="body1">{name}</Typography>
          <div className="flex items-center justify-between">
            {receiver && (
              <div className="flex">
                <PhoneIcon className="w-3 h-3 text-slate-500" />
                <Typography variant="caption" className="mx-2 text-slate-600">
                  {receiver}
                </Typography>
                <Typography variant="caption" className="text-slate-400">
                  {formatMessage(multipleVoicePrintSourceMessages.receiver)}
                </Typography>
              </div>
            )}
            <div className="flex">
              <CalendarDaysIcon className="w-3 h-3 text-slate-500" />
              <Typography variant="caption" className="mx-2 text-slate-600">
                {date}
              </Typography>
              <Typography variant="caption" className="text-slate-400">
                {type === 'TRANSMITTED_AUDIO'
                  ? formatMessage(multipleVoicePrintSourceMessages.wasDone)
                  : formatMessage(multipleVoicePrintSourceMessages.wasDone)}
              </Typography>
            </div>
            {typeof totalAudios !== 'undefined' && (
              <div className="flex items-center">
                <AudioWaveIcon className="h-3 w-3 text-slate-500" />
                <Typography variant="caption" className="text-slate-600 mx-2">
                  {totalAudios}
                </Typography>
                <Typography variant="caption" className="text-slate-500">
                  {formatMessage(
                    multipleVoicePrintSourceMessages.associatedAudio
                  )}
                </Typography>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default VoiceprintData
