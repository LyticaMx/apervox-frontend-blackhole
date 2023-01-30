import { ResponseData } from 'types/api'
import {
  Actions,
  CallsFilters,
  ControlGroup,
  GetGroupsParams,
  ParamsAddAudios,
  ParamsCG,
  State
} from 'types/control'
import { initialState } from './context'
import { useServices } from './services'

import { actions } from './constants'
import { useDatesFilter } from 'context/DatesFilter'
import { DatesFilterForm } from 'types/datesFilter'
import { subHours } from 'date-fns'

const useActions = (state: State, dispatch): Actions => {
  const services = useServices()
  const { actions: actionsDates, dates } = useDatesFilter()

  const initView = (): void => {
    dispatch(actions.setControlGroup(undefined))
    dispatch(actions.setAudios(initialState.audios))
    dispatch(actions.setCalls(initialState.calls))

    getControlGroups({ page: 1 })
  }

  const setDates = async (payload: DatesFilterForm): Promise<void> => {
    try {
      let startTime = payload?.start_time ?? dates.start_time
      if (payload?.time) {
        startTime = subHours(new Date(), payload.time)
      }

      const newDates = {
        ...payload,
        start_time: startTime
      }

      dispatch(actions.setControlGroup(undefined))
      dispatch(actions.setAudios(initialState.audios))
      dispatch(actions.setCalls(initialState.calls))

      await getControlGroups({ page: 1, ...newDates })

      actionsDates?.setForm(payload)
    } catch {}
  }

  const setControlGroup = (controlGroup: ControlGroup): void => {
    dispatch(actions.setControlGroup(controlGroup))

    getCalls({ id: controlGroup.id })
    getAudios(controlGroup.id)
  }

  const getControlGroups = async (
    params?: GetGroupsParams
  ): Promise<boolean> => {
    try {
      const data = await services.groups.get({
        urlParams: {
          page: state.groupsPagination.page,
          limit: state.groupsPagination.limit,
          order_by: state.groupsPagination.orderBy,
          start_time: dates.start_time,
          end_time: dates.end_time,
          ...params
        }
      })

      dispatch(
        actions.setControlGroups(data.data ?? initialState.controlGroups)
      )
      dispatch(
        actions.setGroupsPagination({
          page: data.page_info.current_page,
          limit: params?.limit ?? state.groupsPagination.limit,
          totalRecords: data.page_info.total_records,
          orderBy: params?.order_by ?? state.groupsPagination.orderBy
        })
      )

      return true
    } catch (error) {
      return false
    }
  }

  const saveControlGroup = async (params: ParamsCG): Promise<boolean> => {
    try {
      const body = new FormData()

      body.append('pin', JSON.stringify(params.pin))
      body.append('current', JSON.stringify(params.current))
      body.append('save_embedding', JSON.stringify(params.save_embedding))
      body.append('socket_id', 'control-upload-audios')

      params.audios.forEach((audio) => {
        body.append('audios', audio)
      })

      const data = await services.postControlGroup(
        { body },
        { 'Content-Type': 'multipart/form-data' }
      )

      await getControlGroups()

      return Boolean(data)
    } catch (error) {
      return false
    }
  }

  const getAudios = async (id?: string): Promise<boolean> => {
    try {
      const data: ResponseData = await services.audios.get({
        queryString: 'by-control-group',
        urlParams: { id: id ?? state.controlGroup?.id }
      })

      dispatch(actions.setAudios(data.data ?? initialState.audios))

      return Boolean(data.data)
    } catch (error) {
      dispatch(actions.setAudios(initialState.audios))

      return false
    }
  }

  const addAudios = async (params: ParamsAddAudios): Promise<boolean> => {
    try {
      const body = new FormData()
      params.audios.forEach((audio) => {
        body.append('audios', audio)
      })

      const data = await services.audios.post(
        {
          queryString: 'add-audio-control-group',
          urlParams: {
            control_group_id: params.group_id,
            socket_id: 'socket_id'
          },
          body
        },
        { 'Content-Type': 'multipart/form-data' }
      )

      await getControlGroups()
      await getAudios()

      return Boolean(data)
    } catch (error) {
      return false
    }
  }

  const deleteAudio = async (id: string): Promise<boolean> => {
    try {
      const data = await services.audios.delete({
        body: { list_audios_id: [id], control_group_id: state.controlGroup?.id }
      })

      await getControlGroups()
      await getAudios()

      return Boolean(data)
    } catch (error) {
      return false
    }
  }

  const createEmbedding = async (id: string): Promise<boolean> => {
    try {
      const data = await services.audios.post({
        queryString: 'create-embedding',
        urlParams: { control_group_id: id }
      })

      if (state.controlGroup) {
        dispatch(
          actions.setControlGroup({
            ...state.controlGroup,
            embedding_generate: true
          })
        )
      }
      await getControlGroups()
      await getAudios()

      return Boolean(data.data)
    } catch (error) {
      return false
    }
  }

  const getCalls = async (params?: CallsFilters): Promise<boolean> => {
    try {
      const data = await services.getCalls({
        urlParams: {
          page: params?.page ?? state.callsPagination.page,
          limit: params?.page ?? state.callsPagination.limit,
          order_by: params?.order_by ?? state.callsPagination.orderBy,
          other_pin: params?.other_pin ?? state.callsPagination.otherPin,
          id: params?.id ?? state.controlGroup?.id
        }
      })

      dispatch(actions.setCalls(data.data ?? initialState.calls))
      dispatch(
        actions.setCallsPagination({
          page: data.page_info.current_page,
          limit: params?.limit ?? state.callsPagination.limit,
          totalRecords: data.page_info.total_records,
          orderBy: params?.order_by ?? state.callsPagination.orderBy,
          otherPin: params?.other_pin ?? state.callsPagination.otherPin
        })
      )

      return Boolean(data)
    } catch (error) {
      return false
    }
  }

  const playAudio = async (
    id: string,
    type: string = 'control'
  ): Promise<any> => {
    try {
      const res = await services.playAudio({
        queryString: `stream-${type}/${id}`,
        urlParams: {
          auth_token: localStorage.getItem('token')
        }
      })

      if (res) {
        return `${
          process.env.REACT_APP_MAIN_BACKEND_URL
        }audios/stream-${type}/${id}?auth_token=${localStorage.getItem(
          'token'
        )}`
      }
      return false
    } catch (error) {
      return false
    }
  }

  const playCall = async (
    id: string,
    type: string = 'transmitted'
  ): Promise<boolean> => {
    try {
      const res = await services.playAudio({
        queryString: `${id}/stream-${type}`,
        urlParams: {
          auth_token: localStorage.getItem('token')
        }
      })

      return !!res
    } catch (error) {
      return false
    }
  }

  return {
    initView,
    setDates,
    setControlGroup,
    getControlGroups,
    saveControlGroup,
    getAudios,
    addAudios,
    deleteAudio,
    getCalls,
    createEmbedding,
    playAudio,
    playCall
  }
}

export { useActions }
