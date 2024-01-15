import { Actions, InnerTechnique, State } from './types'

import { actions } from './constants'
import { TechniqueTabs } from 'types/technique'
import { useService } from 'hooks/useApi'
import { Target } from 'types/target'

const useActions = (state: State, dispatch): Actions => {
  const { technique, activeTab } = state
  const techniqueService = useService('techniques')
  const targetsService = useService('targets')

  const get = async (): Promise<boolean> => {
    try {
      if (!technique) return false
      const response = await techniqueService.get({
        queryString: technique.id ?? ''
      })

      dispatch(
        actions.setTechnique({
          id: response.data.id,
          attentionTurn: response.data.shift ?? '',
          attentionTime: response.data.shift_cutoff ?? '',
          notificationDays: response.data.notification_days?.toString() ?? '0',
          notificationHours:
            response.data.notification_hours?.toString() ?? '0',
          created_at: response.data.created_at,
          expires_at: response.data.end_date,
          name: response.data.name,
          priority: response.data.priority,
          registered_by: response.data.created_by?.username ?? '',
          status: response.data.status,
          groups: response.data.groups ?? []
        })
      )

      /*
      dispatch(
        actions.setTechnique({
          id: response.data.id,
          attention_turn: response.data.shift ?? '',
          attention_time: response.data.notification_time ?? 0,
          created_at: response.data.created_at,
          expires_at: response.data.end_date,
          name: response.data.name,
          priority: response.data.priority,
          registered_by: response.data.created_by.username,
          total_target: 0,
          status: response.data.status,
          groups: response.data.groups ?? []
        })
      )
      */

      return true
    } catch {
      return false
    }
  }

  const hasLinkedDateTargets = async (): Promise<boolean> => {
    try {
      if (!technique) return false

      const response = await techniqueService.get({
        queryString: `${technique.id ?? ''}/targets`,
        urlParams: {
          has_end_date: false,
          page: 1,
          limit: 1
        }
      })

      if (response.size === 0) return false

      return true
    } catch {
      return false
    }
  }

  const getDescription = async (): Promise<boolean> => {
    try {
      if (!technique) return false
      const response = await techniqueService.get({
        queryString: `${technique.id ?? ''}/description`
      })
      dispatch(actions.setSummary(response.data.description))
      return true
    } catch {
      return false
    }
  }

  const updateDescription = async (description: string): Promise<boolean> => {
    try {
      if (!technique) return false
      await techniqueService.put({
        queryString: `${technique.id ?? ''}/description`,
        body: { description }
      })

      return true
    } catch {
      return false
    }
  }

  const update = async (
    newTechnique: Omit<
      InnerTechnique,
      'description' | 'attention_turn' | 'status' | 'total_target'
    >,
    staticDateTargets: string[] = []
  ): Promise<boolean> => {
    try {
      if (!technique) return false
      const body: Record<string, any> = {}
      body.name = newTechnique.name
      body.end_date = newTechnique.expires_at
      body.priority = newTechnique.priority
      body.groups = newTechnique.groups
      body.static_end_date_targets = staticDateTargets
      body.notification_days = 0
      body.notification_hours = 0
      if (!isNaN(+newTechnique.notificationDays)) {
        body.notification_days = newTechnique.notificationDays
      }
      if (!isNaN(+newTechnique.notificationHours)) {
        body.notification_hours = newTechnique.notificationHours
      }

      await techniqueService.put({
        queryString: technique.id,
        body
      })

      return true
    } catch {
      return false
    }
  }

  const setTechnique = (payload: InnerTechnique): void => {
    if (technique && technique.id === payload.id) return

    dispatch(actions.setTechnique(payload))
    dispatch(actions.setTarget(undefined))
    dispatch(actions.showForms(false))
    dispatch(actions.setActiveTab(TechniqueTabs.EVIDENCE))
  }

  const setTarget = async (payload: Target | undefined): Promise<void> => {
    if (!payload) {
      dispatch(actions.setActiveTab(TechniqueTabs.EVIDENCE))
      dispatch(actions.showForms(false))
    } else if (activeTab === TechniqueTabs.FORMS) {
      const res = await showForms(payload)

      if (!res) {
        dispatch(actions.setActiveTab(TechniqueTabs.GENERAL_DATA))
      }
    }

    dispatch(actions.setTarget(payload))
  }

  const showForms = async (payload: Target): Promise<boolean> => {
    try {
      await targetsService.get({
        queryString: `${payload.id}/metadata`,
        showToast: false
      })

      dispatch(actions.setTarget(payload))
      dispatch(actions.showForms(true))
      dispatch(actions.setActiveTab(TechniqueTabs.FORMS))

      return true
    } catch (error) {
      dispatch(actions.showForms(false))
      return false
    }
  }

  const setActiveTab = (tab: TechniqueTabs): void => {
    dispatch(actions.setActiveTab(tab))
  }

  return {
    get,
    getDescription,
    updateDescription,
    update,
    setTechnique,
    setTarget,
    hasLinkedDateTargets,
    showForms,
    setActiveTab
  }
}

export { useActions }
