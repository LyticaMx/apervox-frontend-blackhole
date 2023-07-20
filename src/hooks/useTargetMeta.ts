/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { ResponseData } from 'types/api'
import { useService } from './useApi'

type MetaType =
  | 'personal-data'
  | 'biometrics'
  | 'physical-description'
  | 'jobs'
  | 'academics'
  | 'organizations'
  | 'socials'
  | 'places'
  | 'social-networks'
  | 'language-levels'
  | 'bank-accounts'
  | 'vehicles'
  | 'properties'
  | 'companies'
  | 'contacts'

interface Actions {
  get: () => Promise<ResponseData>
  create: (body: object) => Promise<ResponseData>
  update: (body: object) => Promise<ResponseData>
  delete: (id: string) => Promise<ResponseData>
}

interface AddressActions {
  getAddress: () => Promise<ResponseData>
  updateAddress: (body: object) => Promise<ResponseData>
}

type TargetMetaApi<T extends MetaType> = T extends 'personal-data'
  ? Omit<Actions, 'create' | 'delete'> & AddressActions
  : T extends 'physical-description'
  ? Omit<Actions, 'create' | 'delete'>
  : T extends 'biometrics'
  ? Omit<Actions, 'update'>
  : T extends
      | 'jobs'
      | 'academics'
      | 'organizations'
      | 'socials'
      | 'places'
      | 'social-networks'
      | 'language-levels'
      | 'bank-accounts'
      | 'vehicles'
      | 'properties'
      | 'companies'
      | 'contacts'
  ? Omit<Actions, 'create'>
  : Actions

const useTargetMeta = <T extends MetaType>(
  target: string,
  meta: T
): TargetMetaApi<T> => {
  const targetServices = useService('targets')

  switch (meta) {
    case 'personal-data':
      return {
        get: async () =>
          await targetServices.get({
            queryString: `${target}/personal-data`
          }),
        update: async (body: object) =>
          await targetServices.put({
            queryString: `${target}/personal-data`,
            body
          }),
        getAddress: async () =>
          await targetServices.get({
            queryString: `${target}/addresses`
          }),
        updateAddress: async (body: object) =>
          await targetServices.put({
            queryString: `${target}/addresses`,
            body
          })
      } as TargetMetaApi<T>
    case 'physical-description':
      return {
        get: async () =>
          await targetServices.get({
            queryString: `${target}/physical-data`
          }),
        update: async (body: object) =>
          await targetServices.put({
            queryString: `${target}/physical-data`,
            body
          })
      } as TargetMetaApi<T>
    case 'biometrics':
      return {
        create: async (body: object) =>
          await targetServices.post(
            {
              queryString: `${target}/biometrics`,
              body
            },
            { 'Content-Type': 'multipart/form-data' }
          ),
        get: async () =>
          await targetServices.get({
            queryString: `${target}/biometrics`
          }),
        delete: async (fileId: string) =>
          await targetServices.delete({
            queryString: `${target}/biometrics/${fileId}`
          })
      } as TargetMetaApi<T>
    default:
      return {
        get: async () =>
          await targetServices.get({
            queryString: `${target}/${meta}`
          }),
        update: async (body: object) =>
          await targetServices.put({
            queryString: `${target}/${meta}`,
            body
          }),
        delete: async (id: string) =>
          await targetServices.delete({
            queryString: `${target}/${meta}/${id}`
          })
      } as TargetMetaApi<T>
  }
}

export default useTargetMeta
