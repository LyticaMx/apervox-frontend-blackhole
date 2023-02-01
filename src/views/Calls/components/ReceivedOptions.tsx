import { ReactElement } from 'react'
import { useIntl } from 'react-intl'

import Button from 'components/Button'
import { receivedOptionsMessages } from '../messages'
import { generalMessages } from 'globalMessages'
import { useHistory } from 'react-router-dom'
import { pathRoute } from 'router/routes'
import { useCallDetail } from 'context/CallDetail'

interface Props {
  callId: string
  type: 'TRANSMITTED_AUDIO' | 'RECEIVED_AUDIO'
}
const ReceivedOptions = ({ callId, type }: Props): ReactElement => {
  const intl = useIntl()
  const history = useHistory()

  const { summary, embedings, actions } = useCallDetail()

  const hanldeGenerateVP = (): void => {
    actions?.createVoicePrintReceived(callId, type)
  }
  const handleCompare = (): void => {
    history.push(pathRoute.comparisons.oneToOne, {
      id: callId,
      receiver: summary.receiver,
      date: summary.date
    })
  }
  const handleCreateBN = (): void => {
    history.push(pathRoute.bondingNetwork, {
      id: callId
    })
  }

  return (
    <div>
      <Button
        variant="outlined"
        fullwidth
        margin="none"
        className="mt-5"
        onClick={hanldeGenerateVP}
        disabled={embedings.received_embedding}
      >
        {intl.formatMessage(receivedOptionsMessages.generateVoicePrint)}
      </Button>
      <Button
        variant="outlined"
        fullwidth
        margin="none"
        className="mt-5"
        onClick={handleCompare}
        disabled={!embedings.received_embedding}
      >
        {intl.formatMessage(generalMessages.compare)}
      </Button>
      <Button
        variant="outlined"
        fullwidth
        margin="none"
        className="mt-5"
        onClick={handleCreateBN}
        disabled={!embedings.received_embedding}
      >
        {intl.formatMessage(receivedOptionsMessages.createBondingNetwork)}
      </Button>
    </div>
  )
}

export default ReceivedOptions
