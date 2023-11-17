import DeleteDialog from 'components/DeleteDialog'
import { useFormatMessage } from 'hooks/useIntl'
import { ReactElement } from 'react'
import { hangUpMessages } from '../messages'
import { useMonitoring } from 'context/Monitoring'
import useToast from 'hooks/useToast'

interface Props {
  id: string
  target: string
  onClose: () => void
  onConfirm: () => void
  resolve: (value: boolean | PromiseLike<boolean>) => void
}

const HangUpDisclaimer = (props: Props): ReactElement => {
  const getMessage = useFormatMessage(hangUpMessages)
  const { actions } = useMonitoring()
  const { launchToast } = useToast()

  const handleHangUp = async (): Promise<void> => {
    try {
      const hangedUp = Boolean(await actions?.hangUp(props.id))

      props.resolve(hangedUp)

      if (hangedUp) {
        props.onConfirm()
        launchToast({
          title: getMessage('success'),
          type: 'Success'
        })
      }
    } catch {
      props.resolve(false)
    }
  }

  const open = props.id !== ''

  return (
    <DeleteDialog
      title={getMessage('title', { target: props.target })}
      question={getMessage('message', { target: props.target })}
      confirmation={getMessage('passwordConfirm')}
      open={open}
      onAccept={handleHangUp}
      onClose={props.onClose}
    />
  )
}

export default HangUpDisclaimer
