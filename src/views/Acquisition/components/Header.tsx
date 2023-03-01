import { ReactElement } from 'react'

import { useFormatMessage } from 'hooks/useIntl'

import Title from 'components/Title'
import ViewCounter from 'components/ViewCounter'
import ViewFilter from 'components/ViewFilter'

import { messages } from '../messages'
import StoreDrawer from './StoreDrawer'
import { useToggle } from 'usehooks-ts'

const Header = (): ReactElement => {
  const getMessage = useFormatMessage(messages)
  const [open, toggle] = useToggle(false)
  const counters = {
    bussyLines: 5,
    availableLines: 5,
    quarantineLines: 5,
    maintenanceLines: 5,
    verificationLines: 5
  }

  const items = [
    { label: 'Numero de usuarios', name: 'numero_usuarios' },
    { label: 'Usuario', name: 'usuario' }
  ]

  return (
    <div className=" mb-4">
      <div className="flex justify-between">
        <div>
          <Title className="uppercase">{getMessage('title')}</Title>
          <p className="uppercase">04 {getMessage('subtitle')}</p>
        </div>
        <ViewFilter
          fields={items}
          download={(document) => alert(document)}
          action={{ label: getMessage('button'), onClick: toggle }}
        />
      </div>
      <div className="flex gap-2">
        {Object.entries(counters).map(([key, value]) => (
          <ViewCounter count={value} key={key}>
            {getMessage(key)}
          </ViewCounter>
        ))}
      </div>

      <StoreDrawer open={open} onClose={toggle} />
    </div>
  )
}

export default Header