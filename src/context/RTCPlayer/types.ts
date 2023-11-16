export interface RTCPlayerContextType {
  roomName: string
  evidenceID: string
  phoneNumber: string
  target?: string
  actions?: {
    joinRoom: (roomName: string, phoneNumber: string, target?: string) => void
    playEvidence: (
      evidenceID: string,
      phoneNumber: string,
      target?: string
    ) => void
    hidePlayer: () => void
  }
}
