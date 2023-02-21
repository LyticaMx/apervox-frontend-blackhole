import { ReactElement } from 'react'

import { useFormatMessage, useGlobalMessage } from 'hooks/useIntl'

import Title from 'components/Title'
import Typography from 'components/Typography'
import ViewCounter from 'components/ViewCounter'
import ViewFilter from 'components/ViewFilter'

import { messages } from '../messages'

const Header = (): ReactElement => {
  const getMessage = useFormatMessage(messages)
  const getGlobalMessage = useGlobalMessage()

  const items = [
    { label: 'Numero de usuarios', name: 'numero_usuarios' },
    { label: 'Usuario', name: 'usuario' }
  ]

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
            11 {getMessage('ongoingCalls')}
          </Typography>

          <ViewCounter count={5}>
            {getGlobalMessage('hangsup', 'generalMessages')}
          </ViewCounter>
          <ViewCounter count={5}>
            {getGlobalMessage('techniques', 'generalMessages')}
          </ViewCounter>
          <ViewCounter count={5}>
            {getGlobalMessage('verification', 'generalMessages')}
          </ViewCounter>
          <ViewCounter count={5}>
            {getGlobalMessage('trash', 'generalMessages')}
          </ViewCounter>
        </div>
      </div>
      <ViewFilter fields={items} download={(document) => alert(document)} />
    </div>
  )
}

export default Header
