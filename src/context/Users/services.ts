import useApi from 'hooks/useApi'

type Services = Record<string, any>

export const useServices = (): Services => {
  return {
    getDependencies: useApi({
      endpoint: 'dependencies',
      method: 'get'
    }),
    getSummary: useApi({
      endpoint: 'users/summary-users',
      method: 'get'
    }),
    getUsers: useApi({
      endpoint: 'users/get-all-users',
      method: 'get'
    }),
    getRequests: useApi({
      endpoint: 'users/get-not-accepted-users',
      method: 'get'
    }),

    acceptUser: useApi({
      endpoint: 'users/accept-user',
      method: 'post'
    }),
    updateUser: useApi({
      endpoint: 'users/block-user',
      method: 'post'
    })
  }
}
