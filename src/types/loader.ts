export interface LoaderContextType {
  show: boolean
  actions?: {
    addPendingActions: (n?: number) => void
    removePendingActions: (n?: number) => void
    forceShowLoader: () => void
    forceHideLoader: () => void
  }
}
