import { ReactElement } from 'react'
import { QuestionMarkCircleIcon } from '@heroicons/react/24/outline'

import HelpImg from 'assets/Images/Frame_52.png'

import Card from 'components/Card'
import Nodes from 'components/Charts/Nodes'
import { useBondingNetwork } from 'context/BondingNetwork'
import { useFormatMessage } from 'hooks/useIntl'
import Title from 'components/Title'
import InfoMessage from 'components/InfoMessage'
import Tooltip from 'components/Tooltip'
import Typography from 'components/Typography'

import { networkMessages } from '../messages'

const Network = (): ReactElement => {
  const { bondingNetwork, embedding, calls_ids: callsIds } = useBondingNetwork()
  const getMessage = useFormatMessage(networkMessages)
  const hasCalls = !!callsIds.length

  const links = bondingNetwork.links.map((item) => ({
    type: item.type,
    start_node: item.start_node,
    end_node: item.end_node,
    distance: 40
  }))

  const nodes = bondingNetwork.nodes.map((item) => ({
    type: item.type,
    node_name: item.node_name,
    text: item.real_name
  }))

  return (
    <Card>
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center gap-2">
            <Title variant="card">{getMessage('title')}</Title>
            {!!embedding && hasCalls && (
              <span className="bg-gray-200 px-3 py-1 my-2 tracking-widest text-xs rounded">
                {embedding.label}
              </span>
            )}
          </div>
          <InfoMessage>{getMessage('subtitle')}</InfoMessage>
        </div>

        <Tooltip
          content={
            <Card className="bg-white">
              <Typography style="semibold" className="text-slate-700 mb-3">
                {getMessage('zoom')}
              </Typography>
              <img src={HelpImg} className="h-20" />
            </Card>
          }
          classNames={{ panel: 'bg-inherit bg-opacity-0' }}
          placement="bottom"
        >
          <div className="flex items-center">
            <QuestionMarkCircleIcon className="w-5 h-5 mr-1 text-slate-500" />
            <Typography variant="body2">{getMessage('controls')}</Typography>
          </div>
        </Tooltip>
      </div>
      <Nodes links={links} nodes={nodes} colors={['#3b82f6', '#f59e0b']} />
    </Card>
  )
}

export default Network
