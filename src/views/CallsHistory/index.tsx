import { ReactElement, useEffect } from 'react'

import Tabs from 'views/Monitoring/components/Tabs'
import Header from './components/Header'
import CallsTable from './components/Table'
import { useCallHistory } from 'context/CallHistory'
import { ReleaseEvidence, WorkingEvidence } from 'types/evidence'
import { useEvidenceSocket } from 'context/EvidenceSocket'

const CallsHistory = (): ReactElement => {
  const { actions: historyActions } = useCallHistory()
  const socket = useEvidenceSocket()

  useEffect(() => {
    const working = (data: WorkingEvidence): void => {
      historyActions?.updateEvidence(data.id)
    }
    const release = (data: ReleaseEvidence): void => {
      historyActions?.updateEvidence(data.id)
    }

    if (socket) {
      socket.on('working_evidence', working)
      socket.on('release_evidence', release)
    }

    return () => {
      if (socket) {
        socket.off('working_evidence', working)
        socket.off('release_evidence', release)
      }
    }
  }, [socket, historyActions])

  return (
    <div>
      <Tabs />
      <Header />
      <CallsTable />
    </div>
  )
}

export default CallsHistory
