import { CallModel } from './call'
import { Pin } from './pin'
import { ComparativeValues, TimeChartValues } from './statistics'

export interface DashboardStatistics {
  counts: {
    calls: ComparativeValues
    pins: ComparativeValues
    alerts: ComparativeValues
  }
  charts: {
    calls: TimeChartValues[]
    alerts: TimeChartValues[]
  }
  calls: CallModel[]
  pins: Pin[]
}

export interface DashboardContextType {
  data: DashboardStatistics
  actions?: {
    getStatistics: () => void
  }
}
