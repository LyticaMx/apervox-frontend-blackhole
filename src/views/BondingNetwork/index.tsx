import { ReactElement, useEffect } from 'react'

import { useFormatMessage } from 'hooks/useIntl'
import { useBondingNetwork } from 'context/BondingNetwork'

import Title from 'components/Title'
import Typography from 'components/Typography'

import Calls from './components/Calls'
import Filters from './components/Filters'
import Network from './components/Network'

import { messages } from './messages'

const BondingNetwork = (): ReactElement => {
  const { actions } = useBondingNetwork()
  const getMessage = useFormatMessage(messages)

  useEffect(() => {
    actions?.getPins()
  }, [])

  return (
    <div className="space-y-5">
      <div>
        <Title variant="page">{getMessage('title')}</Title>
        <Typography variant="body2" className="text-gray-500">
          {getMessage('subtitle')}
        </Typography>
      </div>
      <Filters />
      <Network />
      <Calls />
    </div>
  )
}

export default BondingNetwork
