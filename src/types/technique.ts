import { Priority } from './priority'
import { Status } from './status'

export enum Turn {
  MORNING = 'morning',
  EVENING = 'evening',
  NIGHTNING = 'nightning'
}

export interface Technique {
  id: string
  name: string
  created_at: string
  expires_at: string
  registered_by: string
  time_on_platform: string
  total_objective: number
  priority: Priority
  turn_of_attention: Turn
  status: Status
}
