import { ReactElement } from 'react'

import { useFormatMessage } from 'hooks/useIntl'

import Title from 'components/Title'
import Typography from 'components/Typography'
import { messages } from '../messages'
import { useMonitoring } from 'context/Monitoring'
import { formatTotal } from 'utils/formatTotal'
import DownloadDialog from 'components/DownloadDialog'

const Header = (): ReactElement => {
  const getMessage = useFormatMessage(messages)
  const { total, actions } = useMonitoring()

  return (
    <div className="flex justify-between mb-4">
      <div>
        <Title className="uppercase">{getMessage('title')}</Title>
        <div className="flex gap-2">
          <Typography
            variant="subtitle"
            style="semibold"
            className="uppercase text-secondary text-base mr-4"
          >
            {formatTotal(total, getMessage('ongoingCalls'))}
          </Typography>
          {/* ! Por definir comportamiento
          <ViewCounter count={5}>
            {getGlobalMessage('hangsup', 'platformMessages')}
          </ViewCounter>
          <ViewCounter count={5}>
            {getGlobalMessage('techniques', 'platformMessages')}
          </ViewCounter>
          <ViewCounter count={5}>
            {getGlobalMessage('verification', 'generalMessages')}
          </ViewCounter>
          <ViewCounter count={5}>
            {getGlobalMessage('trash', 'generalMessages')}
          </ViewCounter>
          */}
        </div>
      </div>
      <DownloadDialog
        onExport={(document) => actions?.exportTable(document)}
        disableQuantity
      />
    </div>
  )
}

export default Header
