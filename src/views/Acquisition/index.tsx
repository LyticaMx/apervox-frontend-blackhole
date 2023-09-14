import { ReactElement, useEffect } from 'react'

import Header from './components/Header'
import DataTable from './components/DataTable'
import Tabs from './components/Tabs'
import { ModuleAuditsTypes, useModuleAudits } from 'context/Audit'

const Acquisition = (): ReactElement => {
  const { actions: auditActions } = useModuleAudits()

  useEffect(() => {
    auditActions?.genAudit(ModuleAuditsTypes.AuditableModules.OVERFLOW_LINES)
  }, [])

  return (
    <div>
      <Tabs />
      <Header />
      <DataTable />
    </div>
  )
}

export default Acquisition
