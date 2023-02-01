import { ResponseData } from './api'
import { PaginationFilter } from './filters'
import { Speaker } from './speaker'
import { User } from './user'

export interface Pin {
  id: string
  number: number
  status: boolean
  speaker?: Speaker
  chunk?: Chunk
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
    getPins: (filters?: PaginationFilter) => Promise<ResponseData>
    getChunks: (filters?: PaginationFilter) => Promise<ResponseData>
    createChunk: () => Promise<boolean>
    linkPin: (pin: string, speaker: string) => Promise<boolean>
    deactivatePin: (speaker: string) => Promise<boolean>
  }
}
