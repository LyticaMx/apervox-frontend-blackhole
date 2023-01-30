import useApi, { useService } from 'hooks/useApi'

type Services = Record<string, any>

export const useServices = (): Services => {
  return {
    getDependencies: useApi({
      endpoint: 'dependencies',
      method: 'get'
    }),
    dependency: useService('dependency'),
    getUsers: useApi({
      endpoint: 'users/get-all-users',
      method: 'get'
    }),
    ejectUser: useApi({
      endpoint: 'dependency-user-update',
      method: 'put'
    })
  }
}
