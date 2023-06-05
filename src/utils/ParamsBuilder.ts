import { SortingState } from '@tanstack/react-table'
import { PaginationParams, SearchParams } from 'types/api'
import { DateFilter, PaginationFilter } from 'types/filters'
import { camelToSnakeCase } from './string'

type Order = 'asc' | 'desc'

export class Params {
  page: number
  limit: number
  by: string
  order: Order
  start_time: Date | undefined
  end_time: Date | undefined;
  [x: string]: any

  constructor() {
    this.by = 'created_at'
    this.order = 'desc'
    this.page = 1
    this.limit = 15
  }

  static Builder(): ParamsBuilder {
    return new ParamsBuilder()
  }
}

class ParamsBuilder {
  private params: Params

  constructor() {
    this.params = new Params()
  }

  public pagination(
    actualFilter: PaginationFilter,
    newFilter?: PaginationParams
  ): ParamsBuilder {
    this.params.page = newFilter?.page ?? actualFilter.page
    this.params.limit = newFilter?.limit ?? actualFilter.limit

    return this
  }

  public searchFilters(
    actualFilter: SearchParams,
    newFilter?: SearchParams
  ): ParamsBuilder {
    const query = newFilter?.query ?? actualFilter.query
    const filters = newFilter?.filters ?? actualFilter.filters

    if (filters && filters.length > 0 && query) {
      Object.assign(
        this.params,
        filters.reduce((old, key) => {
          old[key] = query
          return old
        }, {})
      )
    }
    return this
  }

  public putStaticFilter<T extends any>(key: string, value: T): ParamsBuilder {
    this.params[key] = value
    return this
  }

  public putManyStaticFilters<T extends {}>(staticFilters: T): ParamsBuilder {
    Object.assign(this.params, staticFilters)
    return this
  }

  public sort<T extends Object>(
    actualFilter: SortingState,
    newFilter?: SortingState,
    orderByMapper?: T
  ): ParamsBuilder {
    const [sort] = newFilter ?? actualFilter

    if (sort) {
      this.params.by = orderByMapper
        ? orderByMapper[sort.id] ?? sort.id
        : camelToSnakeCase(sort.id)
      this.params.order = sort.desc ? 'desc' : 'asc'
    }

    return this
  }

  public dates(
    actualFilter?: DateFilter,
    newFilter?: DateFilter
  ): ParamsBuilder {
    this.params.start_time =
      newFilter?.start_time ??
      (!newFilter?.clearDates ? actualFilter?.start_time : undefined)

    this.params.end_time =
      newFilter?.end_time ??
      (!newFilter?.clearDates ? actualFilter?.end_time : undefined)

    return this
  }

  public build(): Params {
    return this.params
  }
}
