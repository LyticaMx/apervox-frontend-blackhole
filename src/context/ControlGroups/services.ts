import useApi, { useService } from 'hooks/useApi'

type Services = Record<string, any>

export const useServices = (): Services => {
  return {
    groups: useService('control-groups'),
    postControlGroup: useApi({
      endpoint: 'audios/upload-control-audios',
      method: 'post'
    }),
    audios: useService('control-audios'),
    getCalls: useApi({
      endpoint: 'control-groups/get-comparisons-high-similarity',
      method: 'get'
    }),
    playAudio: useApi({
      endpoint: '/audios',
      method: 'get'
    }),
    playCall: useApi({
      endpoint: '/call',
      method: 'get'
    })
  }
}
