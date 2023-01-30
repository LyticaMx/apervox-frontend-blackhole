import {
  Actions,
  State,
  CallsParams,
  EmbeddingsParams,
  NetworkParams,
  EmbeddingFilters,
  EmbeddingItems
} from 'types/bondingNetwork'
import { actions } from './constants'
import { initialState } from './context'
import { useServices } from './services'

const useActions = (state: State, dispatch): Actions => {
  const services = useServices()

  const setFilters = async (params: EmbeddingFilters): Promise<void> => {
    try {
      const res = await services.getEmbeddings({
        urlParams: {
          page: 1,
          limit: 1,
          get_by: params.get_by ?? state.filters.get_by,
          pin_number: params.pin?.label,
          start_time: params.start_time,
          end_time: params.end_time
        }
      })

      dispatch(actions)
      dispatch(
        actions.setEmbeddingsPagination({
          page: 1,
          totalRecords: res.page_info.total_records,
          limit: state.embeddingsPagination.limit
        })
      )
      dispatch(
        actions.setFilters({
          pin: params?.pin ?? state.filters.pin,
          get_by: params.get_by ?? state.filters.get_by,
          start_time: params.start_time,
          end_time: params.end_time
        })
      )
    } catch (error) {}
  }

  const setEmbedding = async (embedding: any): Promise<void> => {
    dispatch(actions.setEmbedding(embedding))
  }

  const getPins = async (): Promise<void> => {
    try {
      await services.getPins({
        urlParams: { only_available: false }
      })
    } catch (error) {}
  }

  const getEmbeddings = async (
    params?: EmbeddingsParams
  ): Promise<EmbeddingItems> => {
    try {
      const res = await services.getEmbeddings({
        urlParams: {
          page: params?.page ?? state.embeddingsPagination.page,
          get_by: params?.get_by ?? state.filters.get_by,
          pin_number: params?.pin?.label ?? state.filters.pin?.label,
          start_time: params?.start_time,
          end_time: params?.end_time
        }
      })
      const newData = res.data ?? []

      dispatch(actions.setEmbeddings(newData))
      dispatch(
        actions.setEmbeddingsPagination({
          page: Number(res.page_info.current_page) + 1,
          totalRecords: res.page_info.total_records,
          limit: params?.limit ?? state.embeddingsPagination.limit
        })
      )
      dispatch(
        actions.setFilters({
          pin: params?.pin ?? state.filters.pin,
          start_time: params?.start_time ?? state.filters.start_time,
          get_by: params?.get_by ?? state.filters.get_by,
          end_time: params?.end_time ?? state.filters.end_time
        })
      )

      return {
        options: newData.map((item) => ({
          value: item.group_id ?? item.id_audio,
          label: item.uid ?? item.name
        })),
        hasMore: res.page_info.has_next_page
      }
    } catch (error) {
      return {
        options: [],
        hasMore: false
      }
    }
  }

  const resetPagination = (): void => {
    dispatch(
      actions.setEmbeddingsPagination({
        page: 1
      })
    )
  }

  const getBondingNetwork = async (params: NetworkParams): Promise<void> => {
    try {
      const response = await services.getNetwork({
        urlParams: {
          get_by: 'CONTROL_GROUP',
          any_id: params.embedding.value,
          similarity: params.similarity
        }
      })

      dispatch(actions.setEmbedding(params.embedding))
      dispatch(actions.setNetwork(response.data.network))
      dispatch(actions.setCallsIds(response.data.calls_list))

      await getCalls({ calls_ids: response.data.calls_list, page: 1 })
    } catch {
      dispatch(actions.setNetwork(initialState.bondingNetwork))
      dispatch(actions.setCallsIds(initialState.calls_ids))
      dispatch(actions.setCalls(initialState.calls))
    }
  }

  const getCalls = async (params?: CallsParams): Promise<void> => {
    try {
      const data = await services.getCalls({
        urlParams: {
          calls_by: 'ALL',
          list_ids: params?.calls_ids ?? state.calls_ids,
          order_by: params?.order_by ?? state.callsPagination.orderBy,
          page: params?.page ?? state.callsPagination.page,
          limit: params?.limit ?? state.callsPagination.limit,
          start_time: params?.start_time,
          end_time: params?.end_time
        }
      })

      dispatch(actions.setCalls(data.data))
      dispatch(
        actions.setCallsPagination({
          page: data.page_info.current_page,
          limit: params?.limit ?? state.callsPagination.limit,
          totalRecords: data.page_info.total_records,
          orderBy: params?.order_by ?? state.callsPagination.orderBy
        })
      )
    } catch {
      dispatch(actions.setCalls(initialState.calls))
    }
  }

  return {
    setFilters,
    setEmbedding,
    resetPagination,
    getPins,
    getEmbeddings,
    getBondingNetwork,
    getCalls
  }
}

export { useActions }
