export interface RTCPlayerContextType {
  roomName: string
  actions?: {
    joinRoom: (roomName: string) => void
    hidePlayer: () => void
  }
}
