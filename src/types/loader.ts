export interface LoaderContextType {
  show: boolean
  actions?: {
    showLoader: () => void
    hideLoader: () => void
  }
}
