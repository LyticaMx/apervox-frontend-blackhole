import { CallModel } from './call'
import { DateFilter, PaginationFilter } from './filters'

export interface BondingNetwork {
  nodes: any[]
  links: any[]
}

export interface CallsParams extends DateFilter, Partial<PaginationFilter> {
  calls_ids?: string[]
  order_by?: string
}

export interface EmbeddingsParams
  extends DateFilter,
    Partial<PaginationFilter> {
  get_by?: string
  pin?: {
    value?: string
    label?: string
  }
}

export interface NetworkParams {
  embedding: {
    value: any
    label: any
  }
  similarity: number
}

export interface EmbeddingFilters extends DateFilter {
  pin?: {
    value?: string
    label?: string
  }
  get_by?: string
}

export interface EmbeddingItems {
  options: Array<{
    value: any
    label: any
  }>
  hasMore: boolean
}

export interface State {
  filters: EmbeddingFilters
  bondingNetwork: BondingNetwork
  embedding: any
  embeddings: any[]
  calls_ids: string[]
  calls: CallModel[]
  embeddingsPagination: {
    limit: number
    page: number
    totalRecords: number
  }
  callsPagination: {
    limit: number
    page: number
    totalRecords: number
    orderBy: string
  }
}
export interface Actions {
  getPins: () => any
  setFilters: (params: EmbeddingFilters) => Promise<void>
  setEmbedding: (item: any) => Promise<void>
  resetPagination: () => void
  getEmbeddings: (params?: EmbeddingsParams) => Promise<EmbeddingItems>
  getBondingNetwork: (params: NetworkParams) => Promise<void>
  getCalls: (params?: CallsParams) => any
}

export interface ContextType extends State {
  actions?: Actions
}
