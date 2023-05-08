import { createContext, Context } from 'react'
import { DrawerContextType } from 'types/drawer'

export const DEFAULT_DRAWER_WIDTH = '350px'

export const initialState: DrawerContextType = {
  show: false,
  type: 'drawer',
  title: null,
  body: null,
  closeButton: null,
  isDismissable: true,
  config: {
    className: '',
    placement: 'right',
    withoutBackdrop: false,
    width: DEFAULT_DRAWER_WIDTH
  }
}

export const DrawerContext: Context<DrawerContextType> =
  createContext(initialState)
