/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { instance } from '../instance'

interface ParamsExample {
  something: ''
}

interface PayloadExample {
  something: ''
}

export const getExample = async (params: ParamsExample) =>
  await instance.get('example/', { params })

export const addExample = async (payload: PayloadExample) =>
  await instance.post('example/', payload)

export const deleteExample = async (collectionId: string) =>
  await instance.delete(`example/${collectionId}`)

export const updateExample = async (
  collectionId: string,
  payload: PayloadExample
) => await instance.put(`example/${collectionId}`, payload)
