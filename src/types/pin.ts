import { Speaker } from './speaker'
import { User } from './user'

export interface Pin {
  id: string
  number: number
  speaker?: Speaker
  chunk: Chunk
  chunk_id: String
}

export interface Chunk {
  id: string
  creator: User
  creator_id: string
  pins: Pin[]
}

export interface PinsContextType {
  listOfPins: Pin[]
  listOfChunks: Chunk[]
  actions?: {
    getPins: () => Promise<boolean>
    getChunks: () => Promise<boolean>
  }
}
