import { ReactElement } from 'react'

import Header from './components/Header'
import CallsTable from './components/Table'
import Tabs from './components/Tabs'

const Monitoring = (): ReactElement => {
  return (
    <div>
      <Tabs />
      <Header />
      <CallsTable />
    </div>
  )
}

export default Monitoring
