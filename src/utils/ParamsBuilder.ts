import { SortingState } from '@tanstack/react-table'
import { SearchParams } from 'types/api'
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

  constructor(defaultBy = 'created_at') {
    this.by = defaultBy
    this.order = 'desc'
    this.page = 1
    this.limit = 15
  }

  static Builder<T extends Record<string, any> | undefined>(
    newParams: T,
    defaultOrderBy?: string
  ): ParamsBuilder<T> {
    return new ParamsBuilder(newParams, defaultOrderBy)
  }
}

class ParamsBuilder<T extends Record<string, any> | undefined> {
  private params: Params
  private readonly newParams: T | undefined

  constructor(newParams: T, defaultOrderBy?: string) {
    this.params = new Params(defaultOrderBy)
    this.newParams = newParams
  }

  public pagination(actualFilter: PaginationFilter): ParamsBuilder<T> {
    this.params.page = this.newParams?.page ?? actualFilter.page
    this.params.limit = this.newParams?.limit ?? actualFilter.limit

    return this
  }

  public searchFilters(actualFilter: SearchParams): ParamsBuilder<T> {
    const query = this.newParams?.query ?? actualFilter.query
    const filters = this.newParams?.filters ?? actualFilter.filters

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

  public putStaticFilter<S extends any>(
    key: string,
    value: S
  ): ParamsBuilder<T> {
    this.params[key] = value
    return this
  }

  public putManyStaticFilters<S extends {}>(
    staticFilters: S
  ): ParamsBuilder<T> {
    Object.assign(this.params, staticFilters)
    return this
  }

  public sort<S extends Object>(
    actualFilter: SortingState,
    orderByMapper?: S
  ): ParamsBuilder<T> {
    const [sort] = this.newParams?.sort ?? actualFilter

    if (sort) {
      this.params.by = orderByMapper
        ? orderByMapper[sort.id] ?? sort.id
        : camelToSnakeCase(sort.id)
      this.params.order = sort.desc ? 'desc' : 'asc'
    }

    return this
  }

  public dates(actualFilter?: DateFilter): ParamsBuilder<T> {
    this.params.start_time =
      this.newParams?.start_time ??
      (!this.newParams?.clearDates ? actualFilter?.start_time : undefined)

    this.params.end_time =
      this.newParams?.end_time ??
      (!this.newParams?.clearDates ? actualFilter?.end_time : undefined)

    return this
  }

  public paginateAndSeach(
    filters: PaginationFilter & SearchParams
  ): ParamsBuilder<T> {
    return this.pagination(filters).searchFilters(filters)
  }

  public build(): Params {
    return this.params
  }
}
