export interface RTCPlayerContextType {
  roomName: string
  phoneNumber: string
  target?: string
  actions?: {
    joinRoom: (roomName: string, phoneNumber: string, target?: string) => void
    hidePlayer: () => void
  }
}
