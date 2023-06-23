import { Actions, InnerTechnique, State } from './types'

import { actions } from './constants'
import { Target, Technique } from 'types/technique'
import { targetData } from 'views/Techniques/mocks'
import { useService } from 'hooks/useApi'

const useActions = (state: State, dispatch): Actions => {
  const { technique } = state
  const techniqueService = useService('techniques')

  const get = async (): Promise<boolean> => {
    try {
      if (!technique) return false
      const response = await techniqueService.get({
        queryString: technique.id ?? ''
      })
      setTechnique({
        id: response.data.id,
        attention_turn: response.data.shift ?? '',
        created_at: response.data.created_at,
        expires_at: response.data.end_date,
        name: response.data.name,
        priority: response.data.priority,
        registered_by: response.data.created_by.username,
        total_target: 0,
        status: response.data.status
      })
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

  const create = async (technique: InnerTechnique): Promise<boolean> => {
    console.log(technique)
    return true
  }

  const update = async (technique: InnerTechnique): Promise<boolean> => true

  const setTechnique = (payload: Technique): void => {
    dispatch(actions.setTechnique(payload))
    getTargets()
  }
  const setTarget = (payload: Target): void => {
    dispatch(actions.setTarget(payload))
  }
  const getTargets = (): void => {
    dispatch(actions.getTargets(targetData))
  }

  return {
    get,
    getDescription,
    updateDescription,
    create,
    update,
    setTechnique,
    setTarget,
    getTargets
  }
}

export { useActions }
