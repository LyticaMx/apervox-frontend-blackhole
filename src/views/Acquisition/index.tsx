import { ReactElement } from 'react'

import Header from './components/Header'
import DataTable from './components/DataTable'
import Tabs from './components/Tabs'

const Acquisition = (): ReactElement => (
  <div>
    <Tabs />
    <Header />
    <DataTable />
  </div>
)

export default Acquisition
