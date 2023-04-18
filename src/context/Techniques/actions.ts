import { Actions, State } from './types'

import { actions } from './constants'
import { techniquesData } from 'views/Techniques/mocks'

const useActions = (state: State, dispatch): Actions => {
  const getTechniques = (): void => {
    dispatch(actions.getTechniques(techniquesData))
  }

  return {
    getTechniques
  }
}

export { useActions }
