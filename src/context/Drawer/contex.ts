import { createContext, Context } from 'react'
import { DrawerContextType } from 'types/drawer'

export const initialState: DrawerContextType = {
  show: false,
  title: null,
  body: null,
  closeButton: null,
  isDismissable: true,
  config: {
    className: '',
    placement: 'right',
    withoutBackdrop: false
  }
}

export const DrawerContext: Context<DrawerContextType> =
  createContext(initialState)