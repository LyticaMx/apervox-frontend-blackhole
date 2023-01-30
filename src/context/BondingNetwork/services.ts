import useApi from 'hooks/useApi'

type Services = Record<string, any>

export const useServices = (): Services => {
  return {
    getPins: useApi({
      endpoint: 'pins',
      method: 'get'
    }),

    getEmbeddings: useApi({
      endpoint: 'get-audio-embeddings-detail',
      method: 'get'
    }),

    getNetwork: useApi({
      endpoint: 'get-network-dummy',
      method: 'get'
      // base: 'analysis'
    }),

    getCalls: useApi({
      endpoint: 'calls-by-list',
      method: 'get'
    })
  }
}
