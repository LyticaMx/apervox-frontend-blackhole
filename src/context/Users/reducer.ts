import { Action } from 'types/contextReducer'
import { UserContextState } from 'types/user'
import { Types } from './constants'

export const reducer = (
  state: UserContextState,
  action: Action<Types>
): UserContextState => {
  switch (action.type) {
    default:
      return state
  }
}
