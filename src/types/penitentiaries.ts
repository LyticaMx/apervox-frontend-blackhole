import { Speaker } from './speaker'
import { Location } from './location'

export interface Penitentiary {
  id: string
  name: string
  location: Location
  location_id: string
  speakers: Speaker[]
  deleted: boolean
  created_at: string
  updated_at: string
}
