import { Actions, InnerTechnique, State } from './types'

import { actions } from './constants'
import { Target, Technique } from 'types/technique'
import { targetData } from 'views/Techniques/mocks'

const useActions = (state: State, dispatch): Actions => {
  const get = async (id: string): Promise<void> => {}

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
    create,
    update,
    setTechnique,
    setTarget,
    getTargets
  }
}

export { useActions }
