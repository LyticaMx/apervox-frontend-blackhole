import { DateFilter, SearchFilter } from './filters'

export interface Action<T extends string = string, P = any> {
  readonly type: T
  readonly payload?: P
}

export function createAction<T extends string, P = any>(
  type: T
): (p?: P) => Action<T, P> {
  return (payload?: P): Action<T, P> => ({
    type,
    payload
  })
}

export interface Filters<T extends Object = Object> {
  search?: SearchFilter
  date?: DateFilter
  static?: T
}
