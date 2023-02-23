import { ReactElement } from 'react'

import Tabs from 'views/Monitoring/components/Tabs'
import Header from './components/Header'
import CallsTable from './components/Table'

const CallsHistory = (): ReactElement => {
  return (
    <div>
      <Tabs />
      <Header />
      <CallsTable />
    </div>
  )
}

export default CallsHistory
