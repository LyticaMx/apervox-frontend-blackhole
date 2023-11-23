import { ReactElement } from 'react'

import { useFormatMessage, useGlobalMessage } from 'hooks/useIntl'

import Title from 'components/Title'
import { messages } from '../messages'
import { useMonitoring } from 'context/Monitoring'
import DownloadDialog from 'components/DownloadDialog'
import ViewCounter from 'components/ViewCounter'

const Header = (): ReactElement => {
  const getMessage = useFormatMessage(messages)
  const getGlobalMessage = useGlobalMessage()
  const { total, totalHanged, actions } = useMonitoring()

  return (
    <div className="flex justify-between mb-4">
      <div>
        <Title className="uppercase">{getMessage('title')}</Title>
        <div className="flex gap-2">
          <ViewCounter count={total}>{getMessage('ongoingCalls')}</ViewCounter>
          <ViewCounter count={totalHanged}>
            {getGlobalMessage('hangsup', 'platformMessages')}
          </ViewCounter>
          {/* ! Por definir comportamiento
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
