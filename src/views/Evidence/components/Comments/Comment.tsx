import {
  PaperAirplaneIcon,
  PencilSquareIcon,
  UserCircleIcon
} from '@heroicons/react/24/outline'
import IconButton from 'components/Button/IconButton'
import Typography from 'components/Typography'
import { format } from 'date-fns'
import { platformMessages } from 'globalMessages'
import { ReactElement, useEffect, useRef, useState } from 'react'
import { useIntl } from 'react-intl'

interface Props {
  user: string
  target: string
  eventId: string
  date: string
  message: string
  evidenceId: string
  canBeEdited: boolean
  isEditing: boolean
  onClickEdit: () => void
  onSave: (text: string) => void
}

const Comment = (props: Props): ReactElement => {
  const {
    user,
    date,
    eventId,
    message,
    target,
    canBeEdited,
    isEditing,
    onClickEdit,
    onSave
  } = props
  const { formatMessage } = useIntl()
  const [comment, setComment] = useState('')
  const areaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    setComment(message)
  }, [message])

  const autoRezise = (): void => {
    if (!areaRef.current) return
    areaRef.current.style.height = 'auto'
    areaRef.current.style.height = `${areaRef.current.scrollHeight}px`
  }

  return (
    <div className="flex items-start gap-2 mb-3 last:mb-0">
      <UserCircleIcon className="w-7 h-7" />
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <Typography style="bold" variant="body2" className="text-secondary">
            {user}
          </Typography>
          <div className="flex gap-6">
            <Typography variant="body2" className="text-secondary-gray">
              {`${formatMessage(platformMessages.target)}: ${target}`}
            </Typography>
            <Typography variant="body2" className="text-secondary-gray">
              {`${formatMessage(platformMessages.eventNumber)}: ${eventId}`}
            </Typography>
            <Typography variant="body2" className="text-secondary-gray">
              {format(new Date(date), 'dd/MM/yyyy - HH:mm')}
            </Typography>
          </div>
        </div>
        <div className="flex justify-between">
          {isEditing ? (
            <textarea
              ref={areaRef}
              className="w-full bg-transparent border border-primary-400 resize-none rounded-md scrollbar-hide"
              maxLength={500}
              value={comment}
              onInput={autoRezise}
              onChange={(e) => setComment(e.target.value)}
            />
          ) : (
            <Typography variant="body2" className="text-secondary">
              {message}
            </Typography>
          )}
          {canBeEdited ? (
            isEditing ? (
              <IconButton onClick={() => onSave(comment)}>
                <PaperAirplaneIcon className="h-5 w-5" />
              </IconButton>
            ) : (
              <IconButton onClick={onClickEdit}>
                <PencilSquareIcon className="h-5 w-5" />
              </IconButton>
            )
          ) : null}
        </div>
      </div>
    </div>
  )
}

export default Comment
