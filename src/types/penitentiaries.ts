import { Location, Speaker } from './speaker'

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
