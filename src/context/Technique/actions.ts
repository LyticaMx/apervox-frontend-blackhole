import { Actions, State } from './types'

import { actions } from './constants'
import { Target, Technique } from 'types/technique'
import { objectiveData } from 'views/Techniques/mocks'

const useActions = (state: State, dispatch): Actions => {
  const setTechnique = (payload: Technique): void => {
    dispatch(actions.setTechnique(payload))
    getTargets()
  }
  const setTarget = (payload: Target): void => {
    dispatch(actions.setTarget(payload))
  }
  const getTargets = (): void => {
    dispatch(actions.getTargets(objectiveData))
  }

  return {
    setTechnique,
    setTarget,
    getTargets
  }
}

export { useActions }
