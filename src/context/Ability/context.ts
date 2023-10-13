import { createContext } from 'react'
import { defineAbility } from '@casl/ability'

export const initialAbility = defineAbility(() => {})
export const AbilityContext = createContext(initialAbility)
