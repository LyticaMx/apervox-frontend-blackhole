import { ReactNode } from 'react'

export type Placement = 'left' | 'right' | 'bottom' | 'top'

interface DrawerConfig {
  placement?: Placement
  className?: string
  withoutBackdrop?: boolean
}

export type SimpleDrawerConfig = Omit<DrawerContextType, 'actions' | 'show'>

export interface DrawerContextType {
  show: boolean
  title?: ReactNode
  body: ReactNode
  closeButton?: ReactNode
  isDismissable?: boolean
  config?: DrawerConfig
  actions?: {
    handleOpenDrawer: (config: SimpleDrawerConfig) => void
    handleCloseDrawer: () => void
  }
}
