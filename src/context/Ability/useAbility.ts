import { useContext } from 'react'
import { AbilityContext } from './context'
import { MongoAbility, MongoQuery, AbilityTuple } from '@casl/ability'

export const useAbility = (): MongoAbility<AbilityTuple, MongoQuery> =>
  useContext(AbilityContext)
