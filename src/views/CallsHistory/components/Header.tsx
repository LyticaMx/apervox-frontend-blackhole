import { ReactElement } from 'react'

import Title from 'components/Title'
import ViewCounter from 'components/ViewCounter'
import ViewFilter from 'components/ViewFilter'

import { useFormatMessage } from 'hooks/useIntl'

import { messages } from '../messages'

const Header = (): ReactElement => {
  const getMessage = useFormatMessage(messages)

  const items = [
    { label: 'Numero de usuarios', name: 'numero_usuarios' },
    { label: 'Usuario', name: 'usuario' }
  ]

  return (
    <div className="flex justify-between mb-4">
      <div>
        <Title className="uppercase">{getMessage('title')}</Title>
        <div className="flex gap-2">
          <ViewCounter count={5}>{getMessage('totalEvents')}</ViewCounter>
          <ViewCounter count={5}>{getMessage('unclassified')}</ViewCounter>
          <ViewCounter count={5}>{getMessage('noRelevant')}</ViewCounter>
          <ViewCounter count={5}>{getMessage('relevant')}</ViewCounter>
          <ViewCounter count={5}>{getMessage('withTranscription')}</ViewCounter>
        </div>
      </div>
      <ViewFilter fields={items} download={(document) => alert(document)} />
    </div>
  )
}

export default Header
