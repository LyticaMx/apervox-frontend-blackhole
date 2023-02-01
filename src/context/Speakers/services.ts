import useApi from 'hooks/useApi'

type Services = Record<string, any>

export const useServices = (): Services => {
  return {
    getSummaryService: useApi({
      endpoint: 'summary-speaker',
      method: 'get',
      base: 'analysis'
    }),

    getHistogramService: useApi({
      endpoint: 'histogram-calls',
      method: 'get',
      base: 'analysis'
    }),

    getListPinsService: useApi({
      endpoint: 'list-pins-speaker',
      method: 'get',
      base: 'analysis'
    }),

    getHeatmapSpeakersService: useApi({
      endpoint: 'heatmap-speakers',
      method: 'get',
      base: 'analysis'
    }),

    getHeatmapAlertsService: useApi({
      endpoint: 'heatmap-alerts',
      method: 'get',
      base: 'analysis'
    }),

    getCallsByAlertsService: useApi({
      endpoint: 'calls-by-alert',
      method: 'get'
    })
  }
}
